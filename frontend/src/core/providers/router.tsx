import { Layout } from "@/shared/components/layout/layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const WelcomePage = lazy(() => import("@/features/common-pages/welcome"))
const SignInPage = lazy(() => import("@/features/auth/pages/signin"));
const SignUpPage = lazy(() => import("@/features/auth/pages/signup"));


export let router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index: true, element: <WelcomePage/>},
            {
                path: "auth",
                children: [
                    {
                        path: "signin",
                        element: <SignInPage />
                    },
                    {
                        path: "signup",
                        element: <SignUpPage />
                    },
                ]
            }
        ]
    }
])