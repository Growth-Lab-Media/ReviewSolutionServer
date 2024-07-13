declare global {
    namespace Express {
        interface Request {
            user?: any; // Change 'any' to the type of your user object if available
        }
    }
}
