import { Allow, Entity, Fields, Validators } from 'remult';

@Entity('favorite', {
  allowApiCrud: Allow.authenticated,
  allowApiDelete: 'user',
  allowApiInsert: 'user',
})
export class Favorite {
  @Fields.uuid({ validate: Validators.required })
  id!: string;
  @Fields.string({ validate: Validators.required })
  title = '';
  @Fields.boolean()
  isFavorite = true;
  @Fields.date({
    allowApiUpdate: false,
    validate: Validators.required,
  })
  dateAdded = new Date();
  @Fields.string({ validate: Validators.required })
  url = '';
  @Fields.string({ validate: Validators.required })
  userID = '';
  @Fields.string()
  videoID = '';
  @Fields.string()
  thumbnailUrl = '';
}
