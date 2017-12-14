export class AddCommentModel {
    constructor(
        public articleId : string,
        public author : string,
        public content : string,
        public date : string       
      ) { }
      
}