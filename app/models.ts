export type Data = {
    id: string;
    alt_description: string;
    width: number;
    height: number;
    slug: string;
    user: {
        name: string;
        portfolio_url?: string;
        profilPage?: string;
        links: {
            html: string;
        };
    };
    urls: {
        full: string;
        small: string;
        regular: string;
    };
};
export class Photo {
    alt_description: Data["alt_description"];
    slug: Data["slug"];
    dimensions: {
        width: Data["width"];
        height: Data["height"];
    };
    urls: Data["urls"];

    constructor(data: Data) {
        this.alt_description = data.alt_description;
        this.dimensions = { width: data.width, height: data.height };
        this.slug = data.slug;
        this.urls = data.urls;
    }
}

export class Photograph {
    name: string;
    portfolio?: string;
    profilPage: string;

    constructor(user: Data["user"]) {
        // console.log(user);
        this.name = user.name;
        this.portfolio = user?.portfolio_url;
        this.profilPage = user.links.html;
    }
}
