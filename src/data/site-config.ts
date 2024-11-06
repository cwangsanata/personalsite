export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    // title: string;
    // subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    // title: 'Chris',
    // subtitle: 'FOSS',
    description: 'Chris Wangsanata\'s Personal Site',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        { 
            text: 'About',
            href: '/about'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        },
    ],
    socialLinks: [
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/cwangsanata/'
        },
        {
            text: 'GitHub',
            href: 'https://github.com/cwangsanata'
        },
        {
            text: 'Resume',
            href: 'https://docs.google.com/document/d/1v-aM3EuqrcoCtHjvElNCkmjovy4Qn34X57C5dVgekm4/edit?usp=sharing'
            
        }
    ],
    hero: {
        title: 'Nice to meet you, I\'m Chris!',
        text: "I'm **Chris Wangsanata**, a software developer dedicated to the realms of building and scaling software. I approach problems by leveraging all I have learned and conducting additional research to solve any, and all problems. I have a profound appreciation for top-notch software, visual design, and the engineers who build and scale the web as we see today. Feel free to explore some of my coding endeavors on <a href='https://github.com/cwangsanata'>GitHub</a>!",
        image: {
            src: '/hero.jpeg',
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
