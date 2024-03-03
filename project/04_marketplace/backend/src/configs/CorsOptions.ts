import allowedOrigins from "./AllowedOrigins";

const corsOptions: any = {
    origin: function (origin: string, callback: any) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("NOT ALLOWED BY CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET ,HEAD ,PUT ,PATCH ,POST ,DELETE",
};

export default corsOptions;
