export interface ICricketer {
  id: string;
  name: string;
  image: string;
  country: string;
  price: number;
  rating: number;
  type: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  battingStyle: 'Left-Hand-Bat' | 'Right-Hand-Bat';
  bowlingStyle:
    | 'Left-Arm-Pace'
    | 'Right-Arm-Pace'
    | 'Left-Arm-Spin'
    | 'Right-Arm-Spin'
    | 'None';
}

export interface IStoredCricketer {
  id: string;
  name: string;
  image: string;
  type: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  selectedAt: string | Date;
}

export interface IStoredId {
  id: string;
  selectedAt: string | Date;
}

export interface IStoRes {
  success: boolean;
}

export interface ISaveRes extends IStoRes {
  isExist: boolean;
}
