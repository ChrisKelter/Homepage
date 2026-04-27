export class Project {
    constructor(
        public title: string,
        public description: string,
        public category: string,
        public tech: string[],
        public git: string,
        public image?: string,
        public demo?: string
    ) {
    }
}