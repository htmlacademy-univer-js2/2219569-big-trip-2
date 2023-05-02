import generatePoint from '../fish_data/point';

class PointsModel {
    constructor() {
      this.points = Array.from({length: 20}, generatePoint);
    }
  
    getPoints() {
      return this.points;
    }
  }

export default PointsModel;