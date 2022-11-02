import { SocialNetworkEnum } from "../utils/constants";

export interface Experience {
  id: string;
  title: string;
  description: string;
};

export interface Formation {
  id: string;
  course: string;
  startDate: Date | string;
  endDate?: Date | string;
  institution: string;
};

export interface SocialNetwork {
  id: string;
  type?: SocialNetworkEnum;
  url: string;
};
