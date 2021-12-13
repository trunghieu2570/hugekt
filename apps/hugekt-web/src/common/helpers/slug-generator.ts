import slugify from 'slugify';
import { Repository } from 'typeorm';

export async function incrementalSlugGenerate<T>(
    title: string,
    repo: Repository<T>,
): Promise<string> {
    const baseSlug = generateSlug(title);
    let testSlug = baseSlug;
    let num = 0;

    while (await repo.findOne({ where: [{ slug: testSlug }] })) {
        testSlug = `${baseSlug}-${++num}`;
    }

    return testSlug;
}

export const generateSlug = (str: string): string =>
    slugify(str, { lower: true, trim: true });
