'use client';

import { useRouter } from 'next/navigation';
import { useId, useTransition } from 'react';

import { Trash2Icon } from 'lucide-react';

import { deleteGalleryItem } from '@/actions/gallery';

import {
  DETAIL_STYLES,
  type DetailGroup,
  type GalleryItemInput,
} from '@/lib/content';
import type { SaveResult } from '@/lib/form';
import type { LibraryPhoto } from '@/lib/photos';

import {
  AdminForm,
  FormSection,
  TextField,
  useField,
  type Path,
} from '@/components/admin/form';
import { ListField } from '@/components/admin/list-field';
import { PhotosField } from '@/components/admin/photos-field';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

/** How a group of details is shown: rows or a grid, picked like tabs. */
function StyleField({ path }: { path: Path }) {
  const field = useField<DetailGroup['style']>(path);
  return (
    <div
      className='flex flex-col gap-2'
      role='radiogroup'
      aria-label='Shown as'
    >
      <p className='text-sm font-medium text-foreground'>Shown as</p>
      <div className='flex flex-wrap gap-1'>
        {(
          Object.entries(DETAIL_STYLES) as [DetailGroup['style'], string][]
        ).map(([style, label]) => (
          <Button
            key={style}
            type='button'
            role='radio'
            aria-checked={field.value === style}
            variant={field.value === style ? 'secondary' : 'ghost'}
            onClick={() => field.set(style)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

/** The groups of details under the description, each with its items. */
function DetailGroupsField() {
  return (
    <ListField
      path={['details']}
      label='Details'
      description='Groups of facts under the description: rows, or a grid of tiles for longer lists like PC specs. A group with a name gets it as a heading.'
      addLabel='Add a group'
      newItem={(): DetailGroup => ({ name: '', style: 'rows', items: [] })}
    >
      {(group) => (
        <>
          <TextField
            path={[...group, 'name']}
            label='Name'
            description='Optional.'
          />
          <StyleField path={[...group, 'style']} />
          <ItemsField path={[...group, 'items']} />
        </>
      )}
    </ListField>
  );
}

/** A group's { label, value } items. */
function ItemsField({ path }: { path: Path }) {
  return (
    <ListField
      path={path}
      label='Items'
      addLabel='Add an item'
      newItem={() => ({ label: '', value: '' })}
      inline
    >
      {(item) => (
        <>
          <TextField path={[...item, 'label']} label='Label' />
          <TextField path={[...item, 'value']} label='Value' />
        </>
      )}
    </ListField>
  );
}

/** The optional link at the bottom of the popup. */
function LinkField() {
  const id = useId();
  const link = useField<GalleryItemInput['link']>(['link']);
  return (
    <>
      <Field orientation='horizontal'>
        <Switch
          id={id}
          checked={link.value !== null}
          onCheckedChange={(on) =>
            link.set(on ? { label: '', href: '' } : null)
          }
        />
        <FieldLabel htmlFor={id}>A link at the bottom of the popup</FieldLabel>
      </Field>
      {link.value && (
        <div className='grid gap-5 sm:grid-cols-2'>
          <TextField path={['link', 'label']} label='Text' />
          <TextField
            path={['link', 'href']}
            label='Link'
            placeholder='https://'
          />
        </div>
      )}
    </>
  );
}

export function GalleryItemForm({
  id,
  initial,
  library,
  save,
}: {
  /** Null for a new card. */
  id: string | null;
  initial: GalleryItemInput;
  library: LibraryPhoto[];
  save: (value: GalleryItemInput) => Promise<SaveResult>;
}) {
  const router = useRouter();
  const [deleting, startDelete] = useTransition();

  return (
    <AdminForm
      initial={initial}
      save={save}
      onSaved={id ? undefined : () => router.push('/admin/gallery')}
    >
      <FormSection title='On the card'>
        <TextField path={['name']} label='Name' />
        <TextField path={['short']} label='One-liner' />
        <PhotosField path={['photoIds']} library={library} />
      </FormSection>

      <FormSection title='In the popup'>
        <TextField
          path={['description']}
          label='Description'
          description='A line break starts a new paragraph.'
          multiline
        />
        <DetailGroupsField />
        <LinkField />
      </FormSection>

      {id && (
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                type='button'
                variant='outline'
                className='self-start text-destructive'
              />
            }
          >
            <Trash2Icon />
            Delete card
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this card?</AlertDialogTitle>
              <AlertDialogDescription>
                It goes from the site straight away. Its photos stay in the
                library.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep it</AlertDialogCancel>
              <AlertDialogAction
                variant='destructive'
                disabled={deleting}
                onClick={() =>
                  startDelete(async () => {
                    await deleteGalleryItem(id);
                    router.push('/admin/gallery');
                  })
                }
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AdminForm>
  );
}
