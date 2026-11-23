-- A card's details become groups, each with a name, a style and its items:
-- the details so far are an unnamed group of rows, and the specs a grid
-- named "my pc", so more groups (like the home server's) can follow.
UPDATE "GalleryItem"
SET "details" = (
  CASE WHEN jsonb_array_length("details") > 0
    THEN jsonb_build_array(jsonb_build_object('name', '', 'style', 'rows', 'items', "details"))
    ELSE '[]'::jsonb
  END
) || (
  CASE WHEN jsonb_array_length("specs") > 0
    THEN jsonb_build_array(jsonb_build_object('name', 'my pc', 'style', 'grid', 'items', "specs"))
    ELSE '[]'::jsonb
  END
);

ALTER TABLE "GalleryItem" DROP COLUMN "specs";
