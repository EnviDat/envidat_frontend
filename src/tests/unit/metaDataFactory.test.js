const metadataFilterMethods = require('../../factories/metadataFilterMethods');

it('Tag - creation - empty', () => {
  const tag = metadataFilterMethods.createTag();
  expect(tag).toBeNull();
});

it('Tag - creation - only name', () => {
  const tag = metadataFilterMethods.createTag('someTag');
  expect(tag.name).toBe('someTag');
});

it('Tag - creation - defaults', () => {
  const tag = metadataFilterMethods.createTag('someTag');
  expect(tag.enabled).toBeDefined();
  expect(tag.color).toBeDefined();
  expect(tag.count).toBeDefined();
});

it('Tag - creation - options tag overload', () => {
  const existingTag = { name: 'dude', enabled: false, color: '#ffffff', count: 5};
  const tag = metadataFilterMethods.createTag(existingTag.name, { tag : existingTag });
  expect(tag.name).toBe(existingTag.name);
  expect(tag.enabled).toBe(existingTag.enabled);
  expect(tag.color).toBe(existingTag.color);
  expect(tag.count).toBe(existingTag.count);
});


it('Tag - count - empty', () => {
  const count = metadataFilterMethods.countTags();
  expect(count).toBeDefined();
  expect(count.length).toEqual(0);
});

it('Tag - count - basic', () => {
  const tag1 = metadataFilterMethods.createTag('tag1');
  const tag2 = metadataFilterMethods.createTag('tag2');
  const tag3 = metadataFilterMethods.createTag('tag3');
  const tag4 = metadataFilterMethods.createTag('tag4');

  const tags = [tag1, tag2, tag2, tag3, tag3, tag3, tag4];

  const count = metadataFilterMethods.countTags([{ tags }]);

  expect(count.length).toEqual(4);
  expect(count[0].count).toEqual(3);
  expect(count[1].count).toEqual(2);
  expect(count[2].count).toEqual(1);
  expect(count[3].count).toEqual(1);
});
