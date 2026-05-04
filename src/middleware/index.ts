// import { defineMiddleware } from "astro:middleware";

// // `context` and `next` are automatically typed
// export const onRequest = defineMiddleware((context, next) => {
//     const { url, cookies, redirect } = context;

//     const LogOn = cookies.has("session");

//     const LogPage = url.pathname === "/login/LoginPage/";

//     if(!LogOn && !LogPage) {
//         return redirect("/login/LoginPage/");
//     }

//     if(LogOn && LogPage) {
//         return redirect("/main/Home/");
//     }

//     return next();


// });