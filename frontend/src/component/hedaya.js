const processData = (input) => {
    const result = input.users.reduce((acc, user) => {
      const existingUser = acc.find((item) => item.email === user.email);
      if (existingUser) {
        existingUser.permission_list.push(user.permission_name);
      } else {
        acc.push({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
          city: user.city,
          location: user.location,
          permission_list: [user.permission_name],
        });
      }
      return acc;
    }, []);
    return result;
  };
  
  const input = {
    "users": [
        {
            "id": 1,
            "username": "ayat",
            "email": "r",
            "country": "h",
            "city": "amman",
            "location": "amman",
            "permission_name": "hhhhhhhhhhhhhhhhhhhhhhh"
        },
        {
            "id": 1,
            "username": "ayat",
            "email": "r",
            "country": "h",
            "city": "amman",
            "location": "amman",
            "permission_name": "hhhhhhhhhhhhhhhhhhhhhhhh"
        },
        {
            "id": 1,
            "username": "ayat",
            "email": "r",
            "country": "h",
            "city": "amman",
            "location": "amman",
            "permission_name": "تت"
        },
        {
            "id": 1,
            "username": "ayat",
            "email": "r",
            "country": "h",
            "city": "amman",
            "location": "amman",
            "permission_name": "updateProduct"
        },
        {
            "id": 1,
            "username": "ayat",
            "email": "r",
            "country": "h",
            "city": "amman",
            "location": "amman",
            "permission_name": "admin"
        },
        {
            "id": 1,
            "username": "ayat",
            "email": "r",
            "country": "h",
            "city": "amman",
            "location": "amman",
            "permission_name": "addProduct"
        },
        {
            "id": 2,
            "username": "kalba",
            "email": "maria",
            "country": "amman",
            "city": "amman",
            "location": "amman",
            "permission_name": "addproduct"
        },
        
    ]
  };
  
  const result = processData(input);
  console.log(result);
  