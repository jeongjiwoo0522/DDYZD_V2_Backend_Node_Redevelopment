import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async createDefaultUser(user: Partial<User>): Promise<User> {
        const newUser: User = new User();
        newUser.gcn = user.gcn;
        newUser.email = user.email;
        newUser.name = user.name;
        return this.manager.save(newUser);
    }

    public findUserByClassIdentity(gcn: string): Promise<User> {
        return this.createQueryBuilder('user')
            .where('user.gcn = :gcn')
            .setParameter('gcn', gcn)
            .getOne();
    }

    public findUserByUniqueEmail(email: string): Promise<User> {
        return this.createQueryBuilder('user')
            .where('user.email = :email')
            .setParameter('email', email)
            .getOne();
    }

    public async deviceToken(id: number, token: string): Promise<void> {
        await this.update(id, { device_token: token });
    }

    public async putUserGitHubId(github_id: string, user_id: number) {
        await this.update({ id: user_id }, { github_url: github_id });
    }

    public async putUserProfile(profile: string, user_id: number) {
        await this.update({ id: user_id }, { image_path: profile });
    }

    public async putUserBio(bio: string, user_id: number) {
        await this.update({ id: user_id }, { bio });
    }

    public findOneOnlyGcn(user_id: number): Promise<User> {
        return this.createQueryBuilder('user')
            .select('user.gcn')
            .where('user.id = :id', { id: user_id })
            .getOne();
    }
}
