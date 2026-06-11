# Character Animation — Implementation Notes

Replace the wireframe globe in the hero section with an animated knitted humanoid character
that falls from the sky, lands on their butt, gets up, and waves.

---

## Plan

- **Character source:** Mixamo (free, requires Adobe account) — mixamo.com
- **Aesthetic:** Override all materials with `MeshToonMaterial` after loading for a cel-shaded yarn look
- **Tech:** Three.js `GLTFLoader` + `AnimationMixer` (both already in the `three` package)
- **Placement:** Replace `Globe.astro` in the hero section (Hero.astro already has the slot)

---

## Step 1 — Get the character + animations from Mixamo

1. Go to **mixamo.com**, sign in with a free Adobe account
2. Pick any character you like from the Characters tab
3. Download these 4 animations one at a time (search by name in the Animations tab):
   - **"Falling Down"** or "Falling Idle"
   - **"Hard Landing"** or "Falling To Sitting"
   - **"Getting Up"** or "Standing Up"
   - **"Wave"** or "Greeting"
4. Download settings for each: Format = **FBX**, Skin = **With Skin** (first download only), Pose = **T-Pose**
   - For downloads 2–4: Skin = **Without Skin** (reuses the same rig)

---

## Step 2 — Merge animations in Blender (free, ~15 min)

1. Download and install **Blender** from blender.org (free)
2. Open Blender → File → Import → FBX → import the first animation (With Skin)
3. For each remaining FBX (Without Skin):
   - File → Import → FBX → select file
   - In the import dialog: check **"Automatic Bone Orientation"**, uncheck **"Import User Properties"**
   - Blender merges the animation clips onto the same armature
4. Select the armature → Object Data Properties → check all 4 action names are present
5. File → Export → glTF 2.0 (.glb):
   - Include: **Selected Objects** (armature + mesh)
   - Animation: **NLA Strips** ✓, **All Actions** ✓
   - Save as `public/character.glb`

---

## Step 3 — Replace Globe.astro

Replace `src/components/Globe.astro` with the following (Hero.astro needs no changes):

```astro
---
---
<div id="char-container" class="relative w-full h-[260px] sm:h-[340px] lg:h-[420px]">
    <canvas id="char-canvas" class="block w-full h-full bg-main"></canvas>
</div>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Animation clip names as exported from Blender/Mixamo — adjust to match your export
const CLIP_SEQUENCE = ['FallingDown', 'HardLanding', 'GettingUp', 'Wave'];

function initCharacter() {
    const canvas = document.getElementById('char-canvas') as HTMLCanvasElement | null;
    if (!canvas || (canvas as any).__charInit) return;
    (canvas as any).__charInit = true;

    const container = canvas.parentElement as HTMLElement;
    const width  = container.clientWidth  || 320;
    const height = container.clientHeight || 320;

    let renderer: THREE.WebGLRenderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, premultipliedAlpha: false });
    } catch {
        delete (canvas as any).__charInit;
        return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1, 4);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Yarn/toon material override
    function getColor(): number {
        return document.documentElement.classList.contains('dark') ? 0x7eb8f7 : 0x2d5da1;
    }
    const tones = new Uint8Array([0, 80, 160, 220]);
    const gradientMap = new THREE.DataTexture(tones, 4, 1, THREE.RedFormat);
    gradientMap.magFilter = THREE.NearestFilter;
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.needsUpdate = true;

    let mixer: THREE.AnimationMixer | null = null;
    let animId: number;
    let clipIndex = 0;

    const loader = new GLTFLoader();
    loader.load('/character.glb', (gltf) => {
        const model = gltf.scene;

        // Override materials with toon material for yarn look
        model.traverse((obj) => {
            if ((obj as THREE.Mesh).isMesh) {
                (obj as THREE.Mesh).material = new THREE.MeshToonMaterial({
                    color: getColor(),
                    gradientMap,
                });
            }
        });

        // Scale and center — adjust scale to fit container
        model.scale.setScalar(0.018);
        model.position.y = -1;
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);

        function playNext() {
            if (clipIndex >= CLIP_SEQUENCE.length) {
                // Loop idle after sequence
                const idle = gltf.animations.find(a => a.name.toLowerCase().includes('idle'));
                if (idle) mixer!.clipAction(idle).play();
                return;
            }
            const name  = CLIP_SEQUENCE[clipIndex++];
            const clip  = gltf.animations.find(a => a.name.includes(name));
            if (!clip) { playNext(); return; }
            const action = mixer!.clipAction(clip);
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
            action.play();
        }

        mixer.addEventListener('finished', () => playNext());
        playNext();
    });

    const clock = new THREE.Clock();

    function animate() {
        animId = requestAnimationFrame(animate);
        if (mixer) mixer.update(clock.getDelta());
        renderer.render(scene, camera);
    }
    animate();

    const resizeObs = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
    resizeObs.observe(container);

    const themeObs = new MutationObserver(() => {
        const color = getColor();
        scene.traverse(obj => {
            if ((obj as THREE.Mesh).isMesh)
                ((obj as THREE.Mesh).material as THREE.MeshToonMaterial).color.set(color);
        });
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('astro:before-swap', () => {
        cancelAnimationFrame(animId);
        resizeObs.disconnect();
        themeObs.disconnect();
        mixer?.stopAllAction();
        renderer.dispose();
        delete (canvas as any).__charInit;
    }, { once: true });
}

function tryInit() { requestAnimationFrame(() => initCharacter()); }
document.addEventListener('astro:page-load', tryInit);
tryInit();
</script>
```

---

## Notes

- **Clip names:** After exporting from Blender, open the GLB in https://gltf.report to see the exact animation names,
  then update `CLIP_SEQUENCE` to match.
- **Model scale:** Mixamo characters are large. Adjust `model.scale.setScalar(0.018)` and `model.position.y`
  until the character fits the container nicely.
- **Camera:** `camera.position.set(0, 1, 4)` centers on a standing figure — adjust Y to frame the character.
- **Idle loop:** After the sequence finishes, it looks for any clip with "idle" in the name for a looping idle.
  Mixamo has a "Breathing Idle" or "Idle" clip you can add as a 5th download.
