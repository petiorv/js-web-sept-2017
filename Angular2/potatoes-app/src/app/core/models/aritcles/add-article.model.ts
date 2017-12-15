export class AddArticleModel {
    constructor(
        public author: string,
        public title: string,
        public imgUrl: string,
        public description: string,
        public date: string
    ) { }

}