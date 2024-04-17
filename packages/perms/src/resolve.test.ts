import {
  checkPermissions,
  parsePermission,
  resolvePermissionWithContext,
} from './resolve';

describe('resolvePermissionWithContext()', () => {
  const ctx = {
    a: 'A',
    bbb: 'Bbb',
    cc: 'Cc',
    camelCase: 'casing-important',
    nothing: '',
  };

  it('should not do anything if there are no vars', () => {
    expect(resolvePermissionWithContext('READ:/foo/bar/baz', ctx)).toBe(
      'READ:/foo/bar/baz',
    );
    expect(resolvePermissionWithContext('READ:/foo', ctx)).toBe('READ:/foo');
    expect(resolvePermissionWithContext('READ:/{foo/test', ctx)).toBe(
      'READ:/{foo/test',
    );
    expect(resolvePermissionWithContext('READ:/{foo/bar}/baz', ctx)).toBe(
      'READ:/{foo/bar}/baz',
    );
  });

  it('should resolve variables', () => {
    expect(resolvePermissionWithContext('READ:/foo/{a}/baz', ctx)).toBe(
      'READ:/foo/A/baz',
    );
    expect(resolvePermissionWithContext('READ:/foo/{camelCase}', ctx)).toBe(
      'READ:/foo/casing-important',
    );
    expect(resolvePermissionWithContext('READ:/{nothing}/test', ctx)).toBe(
      'READ://test',
    );
    expect(resolvePermissionWithContext('READ:/{cc}/{bbb}/a', ctx)).toBe(
      'READ:/Cc/Bbb/a',
    );
  });

  it('should throw with missing variables', () => {
    expect(() =>
      resolvePermissionWithContext('READ:/foo/{d}/baz', ctx),
    ).toThrowError();
    expect(() =>
      resolvePermissionWithContext('READ:/foo/{camelcase}/baz', ctx),
    ).toThrowError();
  });
});

describe('parsePermission()', () => {
  it('should parse correctly', () => {
    expect(parsePermission('READ:/a/b/c')).toEqual({
      action: 'READ',
      resources: ['a', 'b', 'c'],
    });
    expect(parsePermission('CREATE:/a/:test')).toEqual({
      action: 'CREATE',
      resources: ['a', ':test'],
    });
    expect(parsePermission('create:/a//b')).toEqual({
      action: 'CREATE',
      resources: ['a', '', 'b'],
    });
    expect(parsePermission('create:/caseSensitive/check')).toEqual({
      action: 'CREATE',
      resources: ['caseSensitive', 'check'],
    });
  });
});

describe('checkPermissions()', () => {
  it('should check simple permissions correctly', () => {
    expect(checkPermissions('READ:/a/b/c', 'READ:/a/b/c')).toBe(true);
    expect(checkPermissions('READ:/aA', 'READ:/aA')).toBe(true);

    expect(checkPermissions('READ:/aA', 'READ:/aa')).toBe(false);
    expect(checkPermissions('READ:/a', 'READ:/aA')).toBe(false);
    expect(checkPermissions('READ:/a/b/c', 'READ:/a/b')).toBe(false);
    expect(checkPermissions('READ:/a/b', 'READ:/a/b/c')).toBe(false);
    expect(checkPermissions('WRITE:/a/b/c', 'READ:/a/b/c')).toBe(false);
  });

  it('should check wildcard action correctly', () => {
    expect(checkPermissions('READ:/a/b/c', 'READ:/a/b/c')).toBe(true);
    expect(checkPermissions('READ:/a/b/c', 'WRITE:/a/b/c')).toBe(false);
    expect(checkPermissions('READ:/a/b/c', '*:/a/b/c')).toBe(true);
    expect(checkPermissions('READ:/a/b/c', '*:/a/b')).toBe(false);
  });

  it('should check wildcard path correctly', () => {
    expect(checkPermissions('READ:/a/b/c', 'READ:/a/b/c')).toBe(true);
    expect(checkPermissions('READ:/a/b/c', 'READ:/a/*/c')).toBe(true);
    expect(checkPermissions('READ:/a/b/c', 'READ:/a/*/*')).toBe(true);
    expect(checkPermissions('READ:/a/b/c/d', 'READ:/a/*/*/d')).toBe(true);
    expect(checkPermissions('READ:/a/b/c/d', 'READ:/*/b/c/d')).toBe(true);

    expect(checkPermissions('READ:/a/b/c/d', 'READ:/*')).toBe(false);
    expect(checkPermissions('READ:/a/b/c/d', 'READ:/*/b/*')).toBe(false);
    expect(checkPermissions('READ:/a/b/c/d', 'READ:/a/b/*')).toBe(false);
    expect(checkPermissions('READ:/a/b/c', 'WRITE:/a/*/c')).toBe(false);
    expect(checkPermissions('READ:/a/b/c', 'WRITE:/a/*/c')).toBe(false);
  });

  it('should check mixed wildcards correctly', () => {
    expect(checkPermissions('READ:/a/b/c', 'READ:/a/b/c')).toBe(true);
    expect(checkPermissions('READ:/a/b/c', '*:/a/*/c')).toBe(true);
    expect(checkPermissions('READ:/a/b/c', '*:/a/*')).toBe(false);
  });
});
