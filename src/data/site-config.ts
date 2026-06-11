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
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
    experiencePerPage?: number;
};

const siteConfig: SiteConfig = {
    title: '> Chris Wangsanata',
    description: 'Chris Wangsanata\'s Personal Site',
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
            text: 'Experience',
            href: '/experience'
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
            text: 'Contact',
            href: '/contact'
        }
        // {
        //     text: 'Tags',
        //     href: '/tags'
        // }
    ],
    footerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
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
        title: 'Hey, I\'m Chris.',
        text: "Software and Solutions engineer in the Bay Area. I build internal tooling, automate things that probably should've been automated years ago, and occasionally ship features that real humans use. Currently doing that at **SavvyMoney**.\n\nI graduated from **UC Berkeley** in 2024 with a CS degree and have since gone deep on fullstack development, AI/LLM tooling, and whatever rabbit hole I find myself in this week. I write about some of it on <a href='https://medium.com/@cwww'>Medium</a> when the mood strikes.",
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    // subscribe: {
    //     title: 'Subscribe to Dante Newsletter',
    //     text: 'One update per week. All the latest posts directly in your inbox.',
    //     formUrl: '#'
    // },
    postsPerPage: 5,
    projectsPerPage: 5,
    experiencePerPage: 10
};

export default siteConfig;
