const wildcard = '*';

export type PermissionContext = Record<string, string | null | undefined>;

export function resolvePermissionWithContext(
  perm: string,
  context?: PermissionContext,
) {
  return perm.replace(/\{(?<var>[a-zA-Z]+)\}/g, (_, variable) => {
    const value = context?.[variable];
    if (value === undefined || value === null)
      throw new Error(
        `Variable ${variable} in perm ${perm} doesnt exist in context`,
      );
    return value;
  });
}

type Permission = {
  resources: string[];
  action: string;
};

export function parsePermission(perm: string): Permission {
  const [action, ...resourceStringRest] = perm.split(':');
  const resourceStringWithoutPrefix = resourceStringRest.join(':').slice(1);
  return {
    action: action.toUpperCase(),
    resources: resourceStringWithoutPrefix.split('/'),
  };
}

export function checkPermissions(
  actionableString: string,
  permissionString: string,
): boolean {
  // actionable will not have wildcards in it, since it has to be an action
  const actionable = parsePermission(actionableString);
  // permission of an entity, it can have wildcards
  const permission = parsePermission(permissionString);

  // if length of parts isnt equal, it will never return true
  if (actionable.resources.length !== permission.resources.length) return false;

  // if action isnt equal, permission is denied EXCEPT if action is wildcard
  if (actionable.action !== permission.action) {
    if (permission.action !== wildcard) {
      return false;
    }
  }

  // this is safe, because actionable and permission is asserted to be equal length
  for (let i = 0; i < actionable.resources.length; i++) {
    const permPart = permission.resources[i];
    const actionablePart = actionable.resources[i];

    // if the part isnt equal, permission is denied EXCEPT if part is a wildcard
    if (permPart !== actionablePart) {
      if (permPart !== wildcard) {
        return false;
      }
    }
  }

  // no inequal parts have been found, so it is safe to return true
  return true;
}
