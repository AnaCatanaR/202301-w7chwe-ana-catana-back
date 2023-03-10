export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegister extends UserCredentials {
  name: string;
  email: string;
  avatar: string;
}

export interface UserProfile extends UserRegister {
  aboutMe: string;
  relationships: {
    friends: RelationshipsStructure;
    enemies: RelationshipsStructure;
  };
}

type RelationshipsStructure = UserProfile[];
