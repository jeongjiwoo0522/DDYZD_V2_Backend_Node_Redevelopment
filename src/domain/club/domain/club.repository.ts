import { EntityRepository, Repository } from 'typeorm';
import { ClubImagesResObj } from '../dto/club.dto';
import { Club } from './club.entity';

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
    public findClubRecruitments(club_id: number): Promise<Club> {
        return this.createQueryBuilder('club')
            .select('club.close_at')
            .addSelect('club.start_at')
            .addSelect('major.major_name')
            .leftJoin('club.majors', 'major')
            .where('club.id = :club_id', { club_id })
            .getOne();
    }

    public findClubStatus(club_id: number): Promise<Club> {
        return this.createQueryBuilder('club')
            .select('club.total_budget')
            .addSelect('club.current_budget')
            .where('club.id = :club_id', { club_id })
            .getOne();
    }

    public findClubBanners(): Promise<ClubImagesResObj[]> {
        return this.createQueryBuilder('club')
            .select('club.banner_image', 'image')
            .addSelect('club.name', 'name')
            .addSelect('club.profile_image', 'profile')
            .getRawMany();
    }

    public findClubPromotionalMaterial(): Promise<ClubImagesResObj[]> {
        return this.createQueryBuilder('club')
            .select('club.hongbo_image', 'image')
            .addSelect('club.name', 'name')
            .addSelect('club.profile_image', 'profile')
            .orderBy("field(id, '19')", 'DESC')
            .addOrderBy('id', 'ASC')
            .getRawMany();
    }

    public async getClubRecruitmentInfo(club_id: number): Promise<boolean> {
        const club = await this.createQueryBuilder('club')
            .select('club.id')
            .addSelect('club.close_at')
            .where('club.id = :id', { id: club_id })
            .getOne();
        return !!club.close_at;
    }

    public getNotificatedRoom(club_id: number): Promise<Club> {
        return this.createQueryBuilder('club')
            .leftJoinAndSelect('club.rooms', 'room')
            .where('club.id = :id', { id: club_id })
            .andWhere("room.status = 'N'")
            .getOne();
    }
}
