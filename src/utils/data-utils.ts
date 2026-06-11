import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

export function sortItemsByDateDesc(
    itemA: CollectionEntry<'blog' | 'projects' | 'experience'>,
    itemB: CollectionEntry<'blog' | 'projects' | 'experience'>
) {
    const dateA = 'startDate' in itemA.data ? itemA.data.startDate : itemA.data.publishDate;
    const dateB = 'startDate' in itemB.data ? itemB.data.startDate : itemB.data.publishDate;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
    const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            return {
                name: tag,
                slug: slugify(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos;
        });
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tagSlug: string) {
    const filteredPosts: CollectionEntry<'blog'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagSlug));
    return filteredPosts;
}

export function calculateDuration(startDate: Date, endDate: Date | undefined, isCurrent: boolean): string {
    const end = isCurrent || !endDate ? new Date() : endDate;
    const months = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth());

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) return `${months} ${months === 1 ? 'month' : 'months'}`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
}

export function getFeaturedExperiences(experiences: CollectionEntry<'experience'>[]) {
    return experiences.filter(({ data }) => data.isFeatured).sort(sortItemsByDateDesc);
}
