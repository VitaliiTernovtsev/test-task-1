export class DeveloperModel {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    framework: string;
    frameworkVersion: string;
    email: string;
    hobby: HobbyModel[];
}

export class HobbyModel {
    name: string;
    duration: string;
}