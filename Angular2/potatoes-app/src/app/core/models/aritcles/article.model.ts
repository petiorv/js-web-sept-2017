export class ArticleModel {
    constructor(
        public _id : string,
        public imgUrl: string,
        public author : string,
        public title : string,
        public description : string,
        public date : string       
      ) { }
      
}