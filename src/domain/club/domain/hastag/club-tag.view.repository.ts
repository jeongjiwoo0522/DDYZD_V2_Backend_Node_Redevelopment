import { EntityRepository, Repository } from 'typeorm';
import { ClubListResObj } from '../../dto/club.dto';
import { ClubTagView } from './club-tag.view.entity';

@EntityRepository(ClubTagView)
export class ClubTagViewRepository extends Repository<ClubTagView> {
    public findAllClub(): Promise<ClubListResObj[]> {
        return this.createQueryBuilder('view')
            .select('view.id', 'clubid')
            .addSelect('view.name', 'clubname')
            .addSelect('view.description', 'clubdescription')
            .addSelect('view.club_image', 'clubimage')
            .addSelect('view.club_banner', 'clubbanner')
            .addSelect('GROUP_CONCAT(view.tag_name)', 'clubtag')
            .groupBy('view.id')
            .getRawMany();
    }

    public async findClubTagsById(club_id: number): Promise<string[]> {
        const result: { clubtag: string } = await this.createQueryBuilder(
            'view',
        )
            .select('GROUP_CONCAT(view.tag_name)', 'clubtag')
            .groupBy('view.id')
            .having('view.id = :id', { id: club_id })
            .getRawOne();
        return result.clubtag.split(',');
    }
}
