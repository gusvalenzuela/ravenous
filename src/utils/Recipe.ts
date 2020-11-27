export default class Recipe {
  constructor(name: string, video_url: string) {
    this.name = name;
    this.video_url = video_url;
    this.thumbnail_url = undefined;
  }

  name: string;
  video_url: string;
  thumbnail_url: string;
}
module.exports = {
  Recipe,
};
