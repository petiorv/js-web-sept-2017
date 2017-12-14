export class CommentModel {
    constructor(
        public _id: string,
        public articleId : string,
        public author : string,
        public content : string,
        public date : string       
      ) { }
      
}