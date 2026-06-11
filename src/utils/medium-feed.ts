export type MediumPost = {
    slug: string;
    title: string;
    excerpt: string;
    publishDate: Date;
    tags: string[];
    canonicalUrl: string;
    htmlContent: string;
};

// CDATA-aware item splitter — skips over <![CDATA[...]]> blocks
function splitItems(xml: string): string[] {
    const items: string[] = [];
    const openTag = '<item>';
    const closeTag = '</item>';
    let pos = 0;

    while (true) {
        const start = xml.indexOf(openTag, pos);
        if (start === -1) break;

        let depth = 1;
        let i = start + openTag.length;
        while (i < xml.length && depth > 0) {
            if (xml.startsWith('<![CDATA[', i)) {
                const cdataEnd = xml.indexOf(']]>', i + 9);
                if (cdataEnd === -1) break;
                i = cdataEnd + 3;
            } else if (xml.startsWith(openTag, i)) {
                depth++;
                i += openTag.length;
            } else if (xml.startsWith(closeTag, i)) {
                depth--;
                if (depth === 0) {
                    items.push(xml.slice(start + openTag.length, i));
                    pos = i + closeTag.length;
                }
                i += closeTag.length;
            } else {
                i++;
            }
        }
        if (depth > 0) break;
    }
    return items;
}

function getField(xml: string, tag: string): string {
    const t = tag.replace(':', '\\:');
    const cdata = xml.match(new RegExp(`<${t}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${t}>`));
    if (cdata) return cdata[1];
    const plain = xml.match(new RegExp(`<${t}[^>]*>([^<]*)</${t}>`));
    return plain ? plain[1].trim() : '';
}

function getAllFields(xml: string, tag: string): string[] {
    const t = tag.replace(':', '\\:');
    const results: string[] = [];
    const re = new RegExp(`<${t}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))</${t}>`, 'g');
    let m;
    while ((m = re.exec(xml)) !== null) {
        results.push((m[1] ?? m[2] ?? '').trim());
    }
    return results;
}

let _cache: MediumPost[] | null = null;

export async function getMediumPosts(): Promise<MediumPost[]> {
    if (_cache) return _cache;

    try {
        const res = await fetch('https://medium.com/feed/@cwww');
        if (!res.ok) return [];
        const xml = await res.text();
        const items = splitItems(xml);

        _cache = items.map((item) => {
            const rawLink = getField(item, 'link');
            const link = rawLink.split('?')[0];
            const slug = link.split('/').filter(Boolean).pop() ?? '';
            const guid = getField(item, 'guid');
            const canonicalUrl = guid.startsWith('http') ? guid : link;

            const htmlContent = getField(item, 'content:encoded');
            const text = htmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const excerpt = text.slice(0, 220).trimEnd() + '…';

            return {
                slug,
                title: getField(item, 'title'),
                excerpt,
                publishDate: new Date(getField(item, 'pubDate') || Date.now()),
                tags: getAllFields(item, 'category'),
                canonicalUrl,
                htmlContent,
            };
        });

        return _cache;
    } catch {
        return [];
    }
}

export function mediumPostToEntry(post: MediumPost) {
    return {
        slug: post.slug,
        data: {
            title: post.title,
            excerpt: post.excerpt,
            publishDate: post.publishDate,
            tags: post.tags,
            canonicalUrl: post.canonicalUrl,
        },
    };
}
