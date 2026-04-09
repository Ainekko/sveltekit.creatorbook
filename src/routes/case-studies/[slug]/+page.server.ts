import { error } from '@sveltejs/kit';
import { getCaseStudyBySlug } from '$lib/data/caseStudies';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;
    const study = getCaseStudyBySlug(slug);

    if (!study || !study.published) {
        throw error(404, 'Case study not found');
    }

    return {
        study
    };
};
