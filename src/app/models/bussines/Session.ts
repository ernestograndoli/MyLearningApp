export interface Patent {
    patentCode: string;
    description: string;
}

export interface Resource {
    resourceCode: string;
    description: string;
    patents: Patent[];
}

export interface Role {
    roleId: number;
    code: string;
    name: string;
    isActive: boolean;
    isSysAdmin: boolean;
    backOfficeTypeCode: string;
    resources: Resource[];
}

export interface User {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    password?: string;
    failedLoginAttempts?: number;
    hasToResetPassword?: boolean;
    isActivationPending?: boolean;
    isActive?: boolean;
    roleId?: number;
    profilePictureId?: number;
    lastSessionDate?: any;
    lastSessionIp?: any;
    backOfficeTypeCode?: string;
    role?: Role;
    profilePicture?: string;
    fullName?: string;
}

export interface Session {
    token?: string;
    profilePicture?: any;
    user: User;
}

export interface ActivateAccount {
    token: string;
    email?: string;
    userId?: number;
    profilePictureId?: number;
    password?: string;
    currentPassword?: string;
}

export interface Auth {
    username: string;
    password: string;
    token?: string;
    ipAddress?: string;
    backOfficeTypeCode: string;
}
