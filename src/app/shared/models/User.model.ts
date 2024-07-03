import { Entity, Fields, Validators } from 'remult';
@Entity<User>('user', {
  allowApiCrud: true,
  allowApiDelete: 'user',
  saving: async (user, e) => {
    if (e.isNew) {
      user.createdAt = new Date();
    }
    user.lastUpdated = new Date();
  },
})
export class User {
  @Fields.uuid()
  id!: string;
  @Fields.createdAt()
  createdAt = new Date();
  @Fields.updatedAt()
  lastUpdated = new Date();
  @Fields.string({ validate: Validators.required })
  name = '';
  @Fields.string({ validate: Validators.required })
  lastName = '';
  @Fields.string({ validate: Validators.required })
  email = '';
  @Fields.string({ validate: Validators.required })
  username = '';
  @Fields.string({ validate: Validators.required })
  password = '';
  @Fields.boolean()
  isActive = true;
  @Fields.json()
  roles: string[] = ['user'];
}
