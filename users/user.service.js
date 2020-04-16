const config = require('config.json');
const jwt = require('jsonwebtoken');

const users = [
    { tenantId: 1, username: 'user1', password: 'user1', firstName: 'Dheerendra', lastName: 'Kumar', data: [] },
    { tenantId: 2, username: 'user2', password: 'user2', firstName: 'Mani', lastName: 'Mani', data: [] }];
const relianceStoreData = [
    {
        label: 'RS',
        name: 'Reliance Digital Store',
        address: 'Gomti Nagar, Lucknow',
        contactNumber: '9415789087',
        openingHours: '10:00 - 17:00',
        lat: 26.8496,
        lng: 81.0072,
        downloadSales: 350,
        InStoreSales: 1030,
        mailStoreSales: 389,
        draggable: false
    },
    {
        label: 'RM',
        name: 'Reliance Digital Xpress Mini',
        address: 'Sharda Nagar, Lucknow',
        contactNumber: '9125044798',
        openingHours: '9:30 -19:30',
        lat: 26.7804,
        lng: 80.9290,
        downloadSales: 890,
        InStoreSales: 1223,
        mailStoreSales: 467,
        draggable: false
    },
    {
        label: 'JD',
        name: 'Jio Digital Store',
        address: 'Bada ChandGanj, Lucknow ',
        contactNumber: '9078987689',
        openingHours: '9:00 - 19:00',
        lat: 26.8784,
        lng: 80.9470,
        downloadSales: 567,
        InStoreSales: 5767,
        mailStoreSales: 462,
        draggable: false
    },
    {
        label: 'RX',
        name: 'Reliance DX-Mini Store',
        address: 'Bangla Bazar, Lucknow',
        contactNumber: '9878979643',
        openingHours: '8:30 - 18:00',
        lat: 26.7954,
        lng: 80.9277,
        downloadSales: 222,
        InStoreSales: 8776,
        mailStoreSales: 685,
        draggable: false
    },
    {
        label: 'RD',
        name: 'Reliance Digital',
        address: 'Munsi Puliya, Lucknow',
        contactNumber: '9579879689',
        openingHours: '8:00 - 17:00',
        lat: 26.8845,
        lng: 80.9947,
        downloadSales: 426,
        InStoreSales: 372,
        mailStoreSales: 374,
        draggable: false
    }
];

module.exports = {
    authenticate,
    getStoreDetails,
    registration
};

async function authenticate({ username, password }) {
    const user = await users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    } else {
        return {
            msg: "Username or password is incorrect"
        }
    }
}

async function registration(registrationObject) {
    const user = await users.find(u => u.username === registrationObject.username);
    if (!user) {
        registrationObject['tenantId'] = users.length + 1;
        users.push(registrationObject);
        return {
            success :true,
            msg: 'User Registered Successfully'
        }
    } else {
        return { 
            success:false,
            msg: 'User Already Present. Please try another userName' }
    }
}

async function getStoreDetails() {
    console.log(relianceStoreData)
    return relianceStoreData;
}
