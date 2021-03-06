import { EntityRepository, Repository } from 'typeorm';
import { ClubMemberResObj } from '../../dto/club.dto';
import { ClubUserView } from './club-user.view.entity';

@EntityRepository(ClubUserView)
export class ClubUserViewRepository extends Repository<ClubUserView> {
    public findUsersClub(gcn: string): Promise<ClubUserView[]> {
        return this.createQueryBuilder('view')
            .select('view.club_name')
            .addSelect('view.club_id')
            .addSelect('view.club_image')
            .where('view.gcn = :gcn', { gcn })
            .getMany();
    }

    public findClubsMember(
        club_id: number,
        head_id: number,
    ): Promise<ClubMemberResObj[]> {
        return this.createQueryBuilder('view')
            .select('view.user_name')
            .addSelect('view.profile_image')
            .addSelect('view.git')
            .addSelect('view.gcn')
            .where('view.club_id = :club_id', { club_id })
            .andWhere('view.user_id != :head_id', { head_id })
            .getMany();
    }
}
