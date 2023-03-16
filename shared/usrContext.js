import React, { useState } from "react";

const UserContext = React.createContext();

// export function UserContextProvider({children}){
//     const [user, setUser] = useState({user:'maneesh'})
    
//     return(
//         <UserContext.Provider value={user}>
//             {children}
//         </UserContext.Provider>
//     )
// }

export default UserContext;