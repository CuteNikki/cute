'use client';

import { useRouter } from 'next/navigation';
import { useId, useTransition } from 'react';

import { Trash2Icon } from 'lucide-react';

import { deleteGalleryItem } from '@/actions/gallery';

import type { GalleryItemInput } from '@/lib/content';
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

/** { label, value } pairs, like the details under a card's description. */
function PairsField({
  path,
  label,
  description,
}: {
  path: Path;
  label: string;
  description: string;
}) {
  return (
    <ListField
      path={path}
      label={label}
      description={description}
      addLabel='Add one'
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
        <PairsField
          path={['details']}
          label='Details'
          description='A few fun facts under the description.'
        />
        <PairsField
          path={['specs']}
          label='Specs'
          description='Optional. A bigger grid, for things with more going on (like PC specs).'
        />
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
