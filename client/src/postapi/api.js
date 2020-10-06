
export const delet = (postId, token) => {
    return fetch(`http://localhost:5050/post/${postId}`,{
        method: 'DELETE',
        headers:{
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization:`Bearer ${token}`,
        }
      
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    }




export const create = (userId, token, post) => {
    return fetch(`http://localhost:5050/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`        
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


   export const update = (postId, token, post) => {
    console.log(postId, token, post);
    return fetch(`http://localhost:5050/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listPosts = (postId) => {
    return fetch(`http://localhost:5050/post/${postId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const postby = (userId, token) => {
    return fetch(`http://localhost:5050/post/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`        
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const like = (userId, token, postId) => {
    return fetch(`http://localhost:5050/post/like`,{
        method: 'PUT',
        headers:{
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({userId,postId})
    })
        .then(response => {
            return response.json(); 
        })
        .catch(err => console.log(err));
    }

    export const unlike = (userId, token, postId) => {
        return fetch(`http://localhost:5050/post/unlike`,{
            method: 'PUT',
            headers:{
             Accept: 'application/json',
             'Content-Type': 'application/json',
             Authorization:`Bearer ${token}`,
            },
            body:JSON.stringify({userId,postId})
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
        }
    

        export const comment = (userId, token, postId, comment) => {
            return fetch(`http://localhost:5050/post/comment`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, postId, comment })
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };

        export const uncomment = (userId, token, postId, comment) => {
            return fetch(`http://localhost:5050/post/uncomment`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, postId, comment })
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };