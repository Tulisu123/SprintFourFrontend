
import { storageService } from '../async-storage.service'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'stay'
_createStays()
export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg
}
window.cs = stayService

async function query(filterBy = { txt: '', price: 0, label: '', sortField: '', sortDir: 1, minCapacity: 0, checkInDate: null, checkOutDate: null }) {
    var stays = await storageService.query(STORAGE_KEY)
    const { txt, minCapacity, label, checkInDate, checkOutDate } = filterBy

    console.log('filterBy in query', filterBy)

    if (txt) {
        const regex = new RegExp(txt, 'i')
        stays = stays.filter(stay =>
            // regex.test(stay.loc.address) ||
            regex.test(stay.loc.country) ||
            regex.test(stay.loc.city)
        )
    }

    if (minCapacity) {
        stays = stays.filter(stay => stay.capacity >= minCapacity)
    }

    if (label) {
        stays = stays.filter(stay => stay.labels.includes(label))
    }

    if (checkInDate && checkOutDate) {
        stays = stays.filter(stay => {
            return !stay.reservedDates.some(range => { //if some of the reserved dates includes the search range dates
                const rangeStart = new Date(range.start).getTime()
                const rangeEnd = new Date(range.end).getTime()
                const checkIn = new Date(checkInDate).getTime()
                const checkOut = new Date(checkOutDate).getTime()

                // Check if there is any overlap
                return !(checkOut <= rangeStart || checkIn >= rangeEnd)
            })
        })
    }
    
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price,
            capacity: stay.capacity,
            reservedDates:stay.reservedDates
        }
        console.log('staytToSave',stayToSave)
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = stay
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function _createStays() {
    let stays = loadFromStorage(STORAGE_KEY) || []
    if (stays && stays.length) return
    stays = [{
        "_id": "622f337a75c7d36e498aaaf8",
        "name": "Siam Stay",
        "type": "National parks",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436852/y3scgbn8d6evumdpwdp4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg"
        ],
        "price": "595",
        "summary": "Westin Kaanapali Ocean Resort Villas North timeshare - Pay resort: $14-20/day, stays under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ \"The Space\" for cleaning/etc AND brief explanation about timeshare reservations - Want guaranteed view for additional cost? Must be weekly rental, other restrictions - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.",
        "capacity": 8,
        "amenities": [
          "TV",
          "Cable TV",
          "Internet",
          "Wifi",
          "Air conditioning",
          "Wheelchair accessible",
          "Pool",
          "Kitchen",
          "Free parking on premises",
          "Doorman",
          "Gym",
          "Elevator",
          "Hot tub",
          "Heating",
          "Family/kid friendly",
          "Suitable for events",
          "Washer",
          "Dryer",
          "Smoke detector",
          "Carbon monoxide detector",
          "First aid kit",
          "Safety card",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "24-hour check-in",
          "Hangers",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "Self check-in",
          "Building staff",
          "Private entrance",
          "Room-darkening shades",
          "Hot water",
          "Bed linens",
          "Extra pillows and blankets",
          "Ethernet connection",
          "Luggage dropoff allowed",
          "Long term stays allowed",
          "Ground floor access",
          "Wide hallway clearance",
          "Step-free access",
          "Wide doorway",
          "Flat path to front door",
          "Well-lit path to entrance",
          "Disabled parking spot",
          "Step-free access",
          "Wide doorway",
          "Wide clearance to bed",
          "Step-free access",
          "Wide doorway",
          "Step-free access",
          "Wide entryway",
          "Waterfront",
          "Beachfront"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "S4dPn",
          "fullname": "User 1",
          "location": "Eureka, California, United States",
          "responseTime": "within an hour",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/men/1.jpg",
          "isSuperhost": true,
          "id": "36133410",
          "description": "Adventurous couple loves to travel :)"
        },
        "loc": {
          "country": "Thailand",
          "countryCode": "US",
          "city": "Bangkok",
          "address": "Lahaina, HI, United States",
          "lat": -156.6917,
          "lan": 20.93792
        },
        "reviews": [
          {
            "at": "2016-06-12T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fc004",
              "fullname": "Kiesha",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "10711825"
            },
            "txt": "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter.",
            "rate": 4
          },
          {
            "at": "2016-07-28T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb204",
              "fullname": "Chris",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "70072865"
            },
            "txt": "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. ",
            "rate": 4
          },
          {
            "at": "2016-09-11T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb703",
              "fullname": "Kim",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "71179725"
            },
            "txt": "We had the perfect location for a room, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves.",
            "rate": 5
          },
          {
            "at": "2017-01-07T05:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb37f",
              "fullname": "Tracy",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "65593239"
            },
            "txt": "Beautiful location. Patty & Peter were super helpful and easy to work with!",
            "rate": 3
          },
          {
            "at": "2017-04-07T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb105",
              "fullname": "Duyen",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "26215688"
            },
            "txt": "Great spot for the kids and family and close to beach and everything at the resort. We will definitely be back.",
            "rate": 3
          },
          {
            "at": "2017-05-09T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fabbe",
              "fullname": "Binh",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "117390236"
            },
            "txt": "The unit and the Westin offer variety of amenities you can possibly ask for. Sofa beds are very comfortable to sleep in. But there is charge for ocean view upgrade. Overall, I highly recommend to book with Patty and Peter. ",
            "rate": 4
          },
          {
            "at": "2018-02-24T05:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb4af",
              "fullname": "Samy",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "15143517"
            },
            "txt": "We spent a great week at Patty and Peter's place. The place was exactly as shown in the pictures, very comfortable, nice view, with all amenities. The resort is great with several pools, a long beach, many restaurants, and of course a lot of great activities all around.",
            "rate": 3
          },
          {
            "at": "2018-06-16T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb87b",
              "fullname": "Breanne",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "78173091"
            },
            "txt": "This place was perfect for my family. We had plenty of room to spread out and the service could not have been any better",
            "rate": 5
          },
          {
            "at": "2018-06-29T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb713",
              "fullname": "Kimberly",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "100535039"
            },
            "txt": "We love Westin Kaanapalli",
            "rate": 5
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Islands"
        ],
        "equipment": {
          "bedsNum": 3,
          "bathNum": 2,
          "bedroomNum": 2
        },
        "reservedDates": [
          {
            "start": "2025-01-03",
            "end": "2025-01-10"
          },
          {
            "start": "2025-02-01",
            "end": "2025-02-03"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf9",
        "name": "Harbour Haven",
        "type": "Campers",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg"
        ],
        "price": "2,000",
        "summary": "Chambre dans un bel appartement moderne avec balcon, ascenseur et terrasse. Private room in a beautiful modern apartment  with balcony, elevator and patio. La chambre est fermée avec une lit double. Vous aurez accès à une salle de bain avec une douche, terrasse. L'appartement est climatisé.  Votre chambre est équipé d'une connexion Wi-Fi illimité. Vous serez proche du centre ville, au pied du pont Jacques Cartier et à distance de marche de toutes les commodités (métro, supermarché, pharmacie",
        "capacity": 2,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Elevator",
          "Buzzer/wireless intercom",
          "Heating",
          "Family/kid friendly",
          "Washer",
          "Dryer",
          "Smoke detector",
          "Carbon monoxide detector",
          "Essentials",
          "Iron",
          "translation missing: en.hosting_amenity_50"
        ],
        "roomType": "Private room",
        "host": {
          "_id": "pZFT4",
          "fullname": "User 2",
          "location": "Montreal, Québec, Canada",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/12be1141-74de-4f04-bf28-82c3ed589d11.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/men/1.jpg",
          "isSuperhost": false,
          "id": "80344827",
          "description": ""
        },
        "loc": {
          "country": "Australia",
          "countryCode": "CA",
          "city": "Sydney",
          "address": "Montréal, QC, Canada",
          "lat": -73.54985,
          "lan": 45.52797
        },
        "reviews": [
          {
            "at": "2016-07-07T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fc058",
              "fullname": "Rowan",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "81703602"
            },
            "txt": "The place was great, as was the host! I would recommend staying here.",
            "rate": 5
          },
          {
            "at": "2016-07-08T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb274",
              "fullname": "Adriana",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "64310987"
            },
            "txt": "J'ai adoré rester là. Très acceuillant.",
            "rate": 4
          },
          {
            "at": "2016-07-12T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb87c",
              "fullname": "Emma",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "23709900"
            },
            "txt": "Angel est un hôte très sympa et arrangeant ! L'appartement est agréable à vivre et propre. Proche du métro et du centre ville. Nous avons passé un très bon séjour !",
            "rate": 4
          },
          {
            "at": "2016-08-02T04:00:00.000Z",
            "by": {
              "_id": "622f3408e36c59e6164fc082",
              "fullname": "Jeffery",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "44882622"
            },
            "txt": "Angel was warm and welcoming and has a beautiful apartment. I'd recommend his place to anyone visiting downtown Montreal!",
            "rate": 4
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Amazing views"
        ],
        "equipment": {
          "bedsNum": 1,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-08",
            "end": "2025-02-11"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaafa",
        "name": "Pharaoh's Palace",
        "type": "Campers",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg"
        ],
        "price": "1,340",
        "summary": "O apartamento fica perto de arte e cultura e dos mais belos monumentos da cidade. Belos jardins e paisagens da cidade e do rio Douro ficam perto e podem ser apreciadas.  Existem restaurantes típicos e de comida internacional ao redor do apartamento.   O espaço fica numa rua típica da cidade, cheia da sua magia e magnetismo e é muito pratico e confortável. O espaço é excelente para quem pretende visitar e conhecer a zona histórica e turística do Porto. Transportes públicos ficam próximos.",
        "capacity": 4,
        "amenities": [
          "TV",
          "Cable TV",
          "Internet",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Paid parking off premises",
          "Free street parking",
          "Buzzer/wireless intercom",
          "Family/kid friendly",
          "Washer",
          "Smoke detector",
          "First aid kit",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "Lock on bedroom door",
          "24-hour check-in",
          "Hangers",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "Private entrance",
          "Crib",
          "Room-darkening shades",
          "Hot water",
          "Bed linens",
          "Extra pillows and blankets",
          "Microwave",
          "Coffee maker",
          "Refrigerator",
          "Dishwasher",
          "Dishes and silverware",
          "Cooking basics",
          "Oven",
          "Stove",
          "Patio or balcony",
          "Luggage dropoff allowed",
          "Long term stays allowed",
          "Wide doorway",
          "Well-lit path to entrance",
          "Step-free access",
          "Wide doorway",
          "Accessible-height bed",
          "Step-free access",
          "Wide doorway",
          "Accessible-height toilet",
          "Step-free access",
          "Wide entryway",
          "Host greets you",
          "Handheld shower head",
          "Paid parking on premises",
          "Fixed grab bars for shower"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "cveg7",
          "fullname": "User 3",
          "location": "Porto, Porto District, Portugal",
          "responseTime": "within an hour",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/c9b876fc-b30e-4951-8f88-af9add00939e.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/women/3.jpg",
          "isSuperhost": true,
          "id": "78704763",
          "description": "Simples, muito comunicativa, mas de elevado sentido de responsabilidade, de organização e de confiança.\r\nGosto muito de contacto humano, sem o qual não me sinto estável. Adoro conhecer pessoas de culturas diferentes.\r\nFaço várias viagens, mas de curta duração, pois tenho necessidade de sentir o lar e a família. Por ser assim, tento fazer tudo para que os meus hospedes se sintam confortáveis como em suas casas."
        },
        "loc": {
          "country": "Egypt",
          "countryCode": "PT",
          "city": "Cairo",
          "address": "Porto, Porto, Portugal",
          "lat": -8.60154,
          "lan": 41.14834
        },
        "reviews": [
          {
            "at": "2016-07-18T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb090",
              "fullname": "Lina & Alexis",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "19177194"
            },
            "txt": "Mes parents ont passé un excellent séjour à Porto dans l'appartement de Maria qui est bien équipé, confortable et très propre. Il est situé au coeur du centre ville et tout est accessible à pied. Si vous venez en voiture, prévoir de se garer dans le parking souterrain payant juste à côté. Mes parents remercient chaudement Maria et son mari qui ont été adorables, notamment par leur accueil chaleureux.",
            "rate": 3
          },
          {
            "at": "2016-08-10T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb4e7",
              "fullname": "Mario R.",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "81211152"
            },
            "txt": "El apartamento es perfecto para una  estancia, esta perfectamente dotado para cubrir las necesidades de un viaje de recreo, situado perfectamente para acceder a pie a las zonas más interesantes de Oporto. María una perfecta anfitriona que te facilitará una inolvidable estancia en Oporto. Ha sido una gran experiencia.",
            "rate": 4
          },
          {
            "at": "2016-08-14T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb110",
              "fullname": "Patricia",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "16580426"
            },
            "txt": "Thierry, Patricia, Anaïs et Manon,\r\nMaria et son mari nous attendaient avec gentillesse et sourires, Maria a toujours répondu à mes mails et SMS en cours de voyage.   Ils nous ont aidé à monter les valises, Il y avait une bouteille d'eau au frais, très appréciable ainsi que des petits gâteaux et une bouteille de vin dans le frigo...L'appartement était très propre rien ne manquait, conforme à la description, bien situé, nous avons tout fait à pieds ...Très à l'écoute de nos demandes Maria et son mari sont charmants, nous nous sommes sentis en famille, nous reviendrons et je recommande fortement ce logement ...Nous avons pu apprécier notre séjour sans tracas.  ",
            "rate": 5
          },
          {
            "at": "2016-09-12T04:00:00.000Z",
            "by": {
              "_id": "622f3401e36c59e6164fab5b",
              "fullname": "Ingrid",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "40501338"
            },
            "txt": "Thanks Maria for your warm welcome. The appartement was really clean. It has everything that we needed for our stay and is really well located. It was easy to park for free near the appartement. Thanks!",
            "rate": 5
          },
          {
            "at": "2017-05-13T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb27c",
              "fullname": "Marie Odile",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "110925120"
            },
            "txt": "L appartement de Maria est tres bien situe, propre et surtout tres calme. Il ne manque rien . Maria nous a tres bien recus . Je recommande cet appartement.",
            "rate": 4
          },
          {
            "at": "2017-06-13T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbd3c",
              "fullname": "Anne",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "23040000"
            },
            "txt": "Maria is a great host and we loved this apartment! It was bright, clean, airy and well-equipped and Maria gave us a thorough introduction to how everything worked. The bed was comfortable (it is not made for tall people though) and nights were quiet as both living room and bedroom are facing the backyard, not the street. Only in the morning we could not sleep in as there was loud construction noise during the day. The metro station is only a few minutes walk away and the city center is at walking distance. We also got a sweet welcome with Portuguese wine.",
            "rate": 5
          },
          {
            "at": "2017-06-30T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbd39",
              "fullname": "Armelle",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "113337848"
            },
            "txt": "Appartement très bien situé, tout le vieux porto se fait à pied. Très propre, indépendant et fonctionnel. Metro au pied en venant de l'aéroport, ligne directe 15 minutes environ.\nRestaurants et épiceries typiques au pied de l'immeuble. Climatisation et télé dans toutes les pièces, calme et quartier pittoresque. À recommander pour 3 ou 4. Accueil simple, gentil et efficace comme Maria la propriétaire.\n",
            "rate": 4
          },
          {
            "at": "2017-08-01T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbc52",
              "fullname": "Domingo",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "114367498"
            },
            "txt": "apartamento bien situado, agradable, bonito, muy limpio y con una anfitriona maravillosa dispuesta a resolver cualquier inconveniente que se pueda presentar. lo recomiendo sin lugar a dudas.\ngracias Mariapor su gentileza",
            "rate": 5
          },
          {
            "at": "2017-08-11T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbb3f",
              "fullname": "Estelle",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "123999116"
            },
            "txt": "Appartement très propre et très bien situé, bien agencé. Quartier très vivant mais appartement calme car ne donne pas sur la rue. Nous avons passé un très bon séjour chez Maria qui nous a très bien accueilli.",
            "rate": 3
          },
          {
            "at": "2017-09-21T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb06f",
              "fullname": "Alfredo Julio Leandro",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "148979666"
            },
            "txt": "Apartamento agradable, muy limpio y muy bien equipado, en zona tranquila pero accesible para llegar a todos lados de a pie. Maria y Arturo nos recibieron con un rico vino del Douro y galletitas y muy buenas recomendaciones para pasear y comer.",
            "rate": 5
          },
          {
            "at": "2017-10-17T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb78f",
              "fullname": "Nataliia",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "137603514"
            },
            "txt": "Нам очень понравилась квартира,светлая,уютная,на 3-м этаже,с большим балконом,в квартире есть все самое необходимое,стиральная машина,утюг,кровати очень удобные,красивое постельное белье,вся обстановка в квартире сделана с душой,все время прибывания чувствовали себя как дома.\nМария по приезду подарила нам бутылку вина из долины реки Дору,из красивых бокалов мы его с удовольствием выпили,спасибо за презент.\nВ этой маленькой уютной квартире -3 телевизора!!!!Смотреть было некогда,наслаждались красивым городом и окрестностями Порту.",
            "rate": 4
          },
          {
            "at": "2017-12-09T05:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fad62",
              "fullname": "Liz",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "144054479"
            },
            "txt": "Muy contentos con todo. El piso estaba bastante cerca del centro, Maria y su marido estaban incluso antes de la hora de nuestra llegada. El piso esta muy bien equipado: cafetera, botiquín, lavadora etc. Super super limpio todo y las camas muy comodas y acogedores. Y al ser un piso interior, no se oia nada de ruido. Recomendable!",
            "rate": 4
          },
          {
            "at": "2018-01-09T05:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb1c3",
              "fullname": "Ariadne",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "151785573"
            },
            "txt": "Eu e minha amiga ficamos um mês no apartamento e foi uma otima experiencia!\nMuito bem localizado, perto de tudo! Não tivemos nenhuma dificuldade em encontrar o local, que fica a minutos da estação do metrô e é muito perto da região central.\nÓtima infraestrutura, limpeza e organização.\nFomos muito bem recebidas e bem auxiliadas pela Maria, que com certeza é uma ótima anfitriã!\nRecomendo muito a estadia, não poderia ter sido melhor!",
            "rate": 3
          },
          {
            "at": "2018-02-27T05:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb5f5",
              "fullname": "Bruno",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "169584809"
            },
            "txt": "Respostas sempre rápidas; excelente recepção ; sempre simpática e disponível.",
            "rate": 3
          },
          {
            "at": "2018-06-24T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fad10",
              "fullname": "João",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "43281546"
            },
            "txt": "Clean, quiet and centrally located. Very welcoming host as well.",
            "rate": 4
          },
          {
            "at": "2018-07-18T04:00:00.000Z",
            "by": {
              "_id": "622f3408e36c59e6164fc075",
              "fullname": "Alcides",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "22956972"
            },
            "txt": "O Espaço de Maria é de extremo bom gosto. Tudo extremamente limpo, pratico e organizado nos mínimos detalhes.  Boa localização perto de tudo.  Sem falar na Simpatia e disponibilidade da Maria que com suas dicas tornou nossa estadia em Porto melhor do que esperávamos. Recomendadíssimo !",
            "rate": 4
          },
          {
            "at": "2018-12-09T05:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbad8",
              "fullname": "Miguel Angel",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "3708225"
            },
            "txt": "Alojamiento coqueto y acogedor, muy limpio y bien ubicado, tiene 2 habitaciones y todo lo necesario para poder pasar unos días en Oporto, buena ubicación cerca de Sta Catarina. Nos ha gustado mucho la estancia, la atención de María inmejorable. Muchas gracias por su atención y amabilidad",
            "rate": 3
          },
          {
            "at": "2018-12-29T05:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbede",
              "fullname": "Alessandro",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "38271990"
            },
            "txt": "buena ubicación, piso acogedor, reformado, excelente servicio y recomendaciones",
            "rate": 5
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Desert"
        ],
        "equipment": {
          "bedsNum": 3,
          "bathNum": 1,
          "bedroomNum": 2
        },
        "reservedDates": [
          {
            "start": "2025-03-14",
            "end": "2025-03-16"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaafb",
        "name": "Palm Jumeirah Retreat",
        "type": "National parks",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg"
        ],
        "price": "1,955",
        "summary": "A spacious, art-filled one-bedroom apartment near the express train (28 minutes to Times Square) and a Citibike station. Sample Bed-Stuy life at a nearby French restaurant,  a sunny Haitian cafe, a boutique grocery and more. We do NOT discriminate based on race, religion or sexual orientation.",
        "capacity": 2,
        "amenities": [
          "Internet",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating",
          "Family/kid friendly",
          "Smoke detector",
          "Carbon monoxide detector",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "24-hour check-in",
          "Hangers",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "translation missing: en.hosting_amenity_49",
          "Self check-in",
          "Lockbox"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "H3qQF",
          "fullname": "User 4",
          "location": "New York, New York, United States",
          "responseTime": "within an hour",
          "thumbnailUrl": "https://a0.muscache.com/im/users/6334250/profile_pic/1368287493/original.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/men/3.jpg",
          "isSuperhost": true,
          "id": "6334250",
          "description": "I'm a journalist from Texas and my husband is an artist from the Ukraine by way of Kansas City. We recently welcomed our son into the world. (Don't worry, he sleeps all night.)  We love exploring New York, especially Brooklyn, from the Brooklyn Flea to tiny taco joints to the Botanic Gardens to performance art in Bushwick storefronts (really). We've both spent a lot of time in the South, so hospitality is second nature to us. "
        },
        "loc": {
          "country": "UAE",
          "countryCode": "US",
          "city": "Dubai",
          "address": "Brooklyn, NY, United States",
          "lat": -73.92922,
          "lan": 40.68683
        },
        "reviews": [
          {
            "at": "2013-05-27T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbfd2",
              "fullname": "Nicolas",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "4523027"
            },
            "txt": "Shaila's place is amazing! It's new, it's clean and it's big! And Shaila is very accommodating, we found everything we needed (cooking, coffee) and more. Given that we were the first guests she hosted through airbnb I can say that she did an amazing job! \r\n",
            "rate": 3
          },
          {
            "at": "2013-06-04T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb048",
              "fullname": "Jeff",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "6443424"
            },
            "txt": "Great, quiet place to stay. It is great having Shaila just upstairs to answer any questions, and especially to give great tips on places to go. ",
            "rate": 5
          },
          {
            "at": "2013-06-13T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fba55",
              "fullname": "Carla",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "6121036"
            },
            "txt": "Shaila and Alex are wonderful hosts really, they helped us every time we needed with directions, the internet, the supermarket, the post office !!! (thank you guys !!!).The place and the neighbord are great, 8 blocks far from the apartment you have the subway and 30 min. later you are in the island, we moved early in the morning, late at night (sometimes we came back at 2am) and everything turned out great.Definetly I would come back to their apartment, It's bigger than ours in Argentina !!! I look forward to stay there again and, next time, go out with you guys and have a beer or anything.\r\nBye !!! - Guido and Carla - ",
            "rate": 5
          },
          {
            "at": "2013-06-20T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbf76",
              "fullname": "Dan",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "6460525"
            },
            "txt": "Shaila and Alex were incredibly accommodating and me and my girlfriend enjoyed our stay thoroughly. Highly recommended. The place was very private and homely. I didn't really know anything about New York and was nervous about staying in bed stuy but it was safe and friendly everywhere I went. Very easy to get to the airport and manhattan by train.",
            "rate": 5
          },
          {
            "at": "2013-06-25T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbe9d",
              "fullname": "Ariane",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "6825718"
            },
            "txt": "Great place to stay in Brooklyn! Alex gave us a really useful list of nice restaurants and coffee places near the place (We are very happy to have discovered, the restaurant \"Saraghina\", thanks to Alex's map!).  The apartment is vast, furnished with taste and very convenient. We highly recommend!",
            "rate": 3
          },
          {
            "at": "2013-07-03T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fad91",
              "fullname": "Ilka",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "5823882"
            },
            "txt": "I can recommend to everyone to come to this beautiful apartment, Shaila and Alex are great hosts and the neighbourhood is very friendly everywhere we go.\r\nIt really felt like home.",
            "rate": 4
          },
          {
            "at": "2013-07-12T04:00:00.000Z",
            "by": {
              "_id": "622f3401e36c59e6164fab81",
              "fullname": "Kristy",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "5729991"
            },
            "txt": "My sister and I loved staying here! The apartment is very spacious and recently renovated so it looks amazing. The kitchen has everything you need with Alex and Shalia stocking it with a few basics. The neighbourhood is a little shabby, especially compared to the home we stayed in. We were told by some people in Manhattan that the neighbour of Bed-Stuy used to be very dangerous and just to be careful walking around at night. Walking from the subway after dark was a little daunting but we remained safe. We did catch a cab a few times from Manhattan as it was very late. Overall, it was a positive experience with Alex and Shalia being very helpful, even going out of their way to let us store our luggage at Shalia's work the day we were to fly out. They were great hosts.",
            "rate": 4
          },
          {
            "at": "2013-07-24T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb785",
              "fullname": "Barbara",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "6063814"
            },
            "txt": "We just met Alex when we checked in, but anyhow he had been a very friendly and helpful host. He was reachable anytime and answered my mails prompt.\r\nThe apartment was great! It was really beautiful and big. It has a perfectly equipped kitchen and there are also a few basics for breakfast and cooking. The bed is very comfortable. It is not that soundproofed as we are accustomed to (the steps from upstairs waked me every day - my son slept well, he did not hear it), but I think that is normal for american houses. But apart from this it is very quiet.\r\nThe neighbourhood is great! It is very authentic, people are friendly and helpful if required, no problems even late at night. We loved staying there!\r\nIn any case: apartment, host and neighbourhood are high recommended! If we are in New York again, we certainly return to this place!",
            "rate": 3
          },
          {
            "at": "2013-07-29T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb515",
              "fullname": "Gloria",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "97251"
            },
            "txt": "Hello! \n\nWe just spent 5 days in the big apple and we drove in to this Brooklyn location.  The host where incredibly attentive and just wonderful, the apartment spotless, hip & modern and really comfortable. \n\nDo not be intimidated by the transitioning neighborhood as we encountered that many residents are very friendly and helpful (directions) and this particular street has a real interest in making a real change hence empowering their community.\n\nThe subway is a little ways (12 to 15 min.) walk. We would use our vehicle to drive to the subway station (there are two corresponding)  and park nearby to facilitate the to and from.  If you need quick access to the subway at all hours of the day and night this may not be the place for you.\n\nThe apt. is an excellent value  for the money (as per  many  manhattan locations offer around  the same nightly  $$ rate but have to share their apt ).\n\n\n\n",
            "rate": 3
          },
          {
            "at": "2013-09-07T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb079",
              "fullname": "Javier",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "7055720"
            },
            "txt": "We really had a wonderful time in NYC thanks to Alex’s house. It’s just as big, beautiful and clean as it seems in the pictures. Alex has an incredible apartment in the basement that makes you feel like home after being out all day knowing the big city. All the furniture and the kitchen appliances are new.\r\n\r\nThe location is perfect for visiting Brooklyn and Manhattan (only 15-20 to Brooklyn Bridge and South Manhattan or 25-30 min to Times Square in the underground).\r\n\r\nAlso, Alex gave us some good advices the first day for having all we needed in the neighbourhood. Don’t miss Saraghina’s brunch (10 minutes walking from the house)! He even let us to keep our luggage in the house until we left to the airport in the evening on our last day in the city.",
            "rate": 3
          },
          {
            "at": "2013-10-09T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fabc4",
              "fullname": "Ivan",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "8866660"
            },
            "txt": "The appartment was really clean, pretty spacious and kitchen was very well equipped! Its totally in line with all the information posted. \r\n\r\nAlex was very nice host, even allowed us to keep the luggage  after check out as we had a flight in the evening. Thank you once again for that! \r\n\r\nThe neighboorhood itself was safe, we had no issues at all, however I`d prefer staying   in Brooklyn districts closer to Manhattan area next time as  we were travelling to Midtown up to 1h. Being a citizen of the huge city too (Moscow, Russia) , underground is not our favorite place to be  :) \r\n\r\nOverall , it was a great stay. \r\n\r\n\r\n\r\n",
            "rate": 5
          },
          {
            "at": "2013-11-01T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fada2",
              "fullname": "India",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "228580"
            },
            "txt": "Communication with Alex was spot on.  He happily answered any questions and made it easy for me to arrive late at night and went above and beyond to help me have a good stay. \r\nThe apartment has been tastefully refurbished.  Extremely clean, and with all you could need for cooking.  The bed is so comfy.  The apartment is peaceful at night and I slept so well.   Some noise travels from Alex' apartment upstairs but it is only a little during the day.\r\nThe area is a bit out of the main hub of Williamsburg and Bushwick but everything is easily accessible with a short walk or the subway about 8 mins walk away.\r\nAlex left me a list of great stores, cafes and restaurants in the immediate area.  \r\nSome people may be concerned about the area at face value as it is a white minority but I felt safe at all times.  People seemed friendly.\r\n\r\n",
            "rate": 3
          },
          {
            "at": "2013-11-10T05:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fb9f9",
              "fullname": "Pamela",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "8145538"
            },
            "txt": "Was an amazing stay, we charm your apartment and were very friendly. Thank you for all your attentions.",
            "rate": 5
          },
          {
            "at": "2013-11-14T05:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fae8c",
              "fullname": "Lindsay",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "979464"
            },
            "txt": "Shaila and Alex are wonderful hosts - very accommodating, friendly, and easy to communicate with. We found it fairly easy to get around the city from Bed-Stuy, even with the weekend subway schedule. The apartment is lovely, bright, and very clean, and overall it was a pleasure to stay for a few nights. It's been recently renovated and thoughtfully decorated - we felt quite comfortable during our stay and appreciated the art and other nice touches throughout. I'd highly recommend staying with Shaila and Alex.",
            "rate": 3
          },
          {
            "at": "2013-12-01T05:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbf31",
              "fullname": "Nadia",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "1133198"
            },
            "txt": "Great apartment, really spacious & has a lovely homely feel to it. Alex & Shaila were very helpful & welcoming, bed was really comfortable, good transport links, only a 20 min subway ride into manhattan, the area is really nice & quiet, unlike manhattan.\r\n\r\nThanks Alex & Shaila for having us ! Enjoy the Gin !! ",
            "rate": 3
          },
          {
            "at": "2014-01-04T05:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbdab",
              "fullname": "Barbara",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "8310069"
            },
            "txt": "The apartment is spacious and well furnished, the kitchen very well equipped and the bed very confortable. Sheila and alex were friendly and the comunication with them was easy.the neighborhood is very nice with typical town house, and very quite. Also the people Who lives there was very kind and helped us on many occasion. \nDefinitely raccommend you to spend your holidays in NY in the lovely apartment of sheila&alex! ",
            "rate": 4
          },
          {
            "at": "2014-03-11T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb2c1",
              "fullname": "Chris",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "9935301"
            },
            "txt": "We had a great time staying with Alex & Shaila. The apartment is just as depicted in the photos. Lots of space and very comfortable.  The house is located really close to buses and subway which was very convenient. The neighbourhood is fine with a couple of nice places to eat nearby.\r\n\r\nShaila and alex were really friendly and easy to communicate with if needed.  \r\n\r\nWe stayed for 2 months and would recommend it to others who are looking for a place in Brooklyn.",
            "rate": 5
          },
          {
            "at": "2014-03-26T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb8fc",
              "fullname": "Melody",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "11278447"
            },
            "txt": "Upon arriving, Alex was very helpful giving directions to the location. , he gave us a brief overview of everything, and let us settle in. It was a very cozy place to come back to after long days out exploring New York. The subways are very close. We preferred heading up to broadway to catch our trains (Depending where we were going) only because it was much more pleasant on sunny days to be above grounds if we could. It was great to have all amenities available, and at such a reasonable price.The only thing I will mention is that if you do plan on sleeping in- it might not happen as they do have a newborn who you can sometimes hear in the morning if you are a light sleeper.\r\nOverall,  I would recommend you stay at Alex & Shailas airbnb! It was a great and pleasant environment.",
            "rate": 3
          },
          {
            "at": "2014-04-10T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb41e",
              "fullname": "Carlos",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "13281573"
            },
            "txt": "We felt very happy those days at the home of Alex and Shaila. It is a very warm and comfortable place, it was like being at home.",
            "rate": 4
          },
          {
            "at": "2014-04-21T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb087",
              "fullname": "Sergei",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "13487808"
            },
            "txt": "Great host. Very clean, nice place and friendly people. Thanks again!",
            "rate": 4
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Design"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-04-03",
            "end": "2025-04-09"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaafc",
        "name": "Burj Khalifa View",
        "type": "Shared homes",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg"
        ],
        "price": "3,000",
        "summary": "Mi piso está en el centro de Barcelona. Cerca del metro, las ramblas, los museos, el Portal del Ángel, Plaza Cataluña. Mi alojamiento es bueno para turistas, aventureros, y viajeros de negocios....y tiene ascensor.",
        "capacity": 2,
        "amenities": [
          "Wifi",
          "Kitchen",
          "Doorman",
          "Elevator",
          "Buzzer/wireless intercom",
          "Heating",
          "Essentials",
          "Hangers",
          "Hair dryer",
          "translation missing: en.hosting_amenity_49",
          "translation missing: en.hosting_amenity_50"
        ],
        "roomType": "Private room",
        "host": {
          "_id": "Wl0m8",
          "fullname": "User 5",
          "location": "Barcelona, Catalonia, Spain",
          "thumbnailUrl": "https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/women/3.jpg",
          "isSuperhost": false,
          "id": "31635864",
          "description": ""
        },
        "loc": {
          "country": "UAE",
          "countryCode": "ES",
          "city": "Dubai",
          "address": "Barcelona, Catalunya, Spain",
          "lat": 2.16685,
          "lan": 41.38371
        },
        "reviews": [
          {
            "at": "2016-07-12T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbebb",
              "fullname": "Rafaela",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "65117711"
            },
            "txt": "Host: Marian gave us a warm welcome and treated us kindly from the very beginning. She offered us help, told us what to visit and even put water, milk and orange juice in the fridge! We could have breakfast at her place which was perfect because she has a little sweet balcony! \r\nLocation: calmly situated in a side street, very near to the Placa Catalunya, the Rambla and the gothic area of Barcelona (very beautiful:)) so you have the old cultural center as well as all the restaurants and bars just nearby.\r\nHouse/Room: the appartment is not a huge, but I think you have everything you need (beautiful sitting room, balcony, kitchen) in it. You have to share the appartment with Marian so pay attention and don't be too loud in the evening!!\r\ndisadvantage: the heat is terrible in summer and there is no air-condition..\r\n\r\nI would overall recommend it to everybody!! But if you want to party and stay up late, take a hostel or another appartment.",
            "rate": 3
          },
          {
            "at": "2016-08-11T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164faf56",
              "fullname": "Pauline",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "50303773"
            },
            "txt": "Nous avons passé un bon séjour, l'appartement est très bien situé. La chambre est agréable et plus grande que sur la photo. Seul point négatif pas de volets dans la chambre. ",
            "rate": 3
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Farms"
        ],
        "equipment": {
          "bedsNum": 1,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-08",
            "end": "2025-02-11"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaafd",
        "name": "Colosseum Retreat",
        "type": "Amazing views",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg"
        ],
        "price": "2,456",
        "summary": "Lit room with balcony. The apartment is in the center, just meters from the Palau de la Musica Catalana. Well connected, a few minutes from Las Ramblas and the Born. Very close to the beach and Ciutadella Park",
        "capacity": 2,
        "amenities": [
          "Wifi",
          "Kitchen",
          "Paid parking off premises",
          "Smoking allowed",
          "Heating",
          "Washer",
          "Essentials",
          "Shampoo",
          "Lock on bedroom door",
          "Hangers",
          "Hair dryer",
          "Iron",
          "translation missing: en.hosting_amenity_49",
          "translation missing: en.hosting_amenity_50",
          "Hot water",
          "Bed linens",
          "Host greets you"
        ],
        "roomType": "Private room",
        "host": {
          "_id": "hwTN9",
          "fullname": "User 6",
          "location": "Barcelona, Catalonia, Spain",
          "responseTime": "within an hour",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/men/5.jpg",
          "isSuperhost": false,
          "id": "35858044",
          "description": "Mi nombre es Isabel, pero me llamo Isa. Nací en Vigo (Galicia). Con 20 años me fuí a vivir a Madrid con intención de ser actriz; ahora resido en Barcelona desde los 28. Soy una joven de 43 años, cantante de Jazz. Me gusta salir, pero también quedarme en casa a leer o ver alguna buena película.\r\nHe compartido piso muchos años, pero estas serán mis primeras experiencias como anfitriona.\r\n\r\n¡Sed bienvenidos!\r\n"
        },
        "loc": {
          "country": "Italy",
          "countryCode": "ES",
          "city": "Rome",
          "address": "Barcelona, Catalonia, Spain",
          "lat": 2.17561,
          "lan": 41.38701
        },
        "reviews": [
          {
            "at": "2016-02-24T05:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb95e",
              "fullname": "Pierre",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "58999873"
            },
            "txt": "Una instancia muy céntrica en uno de estos edificios antiguos del Barri Gotic. No es poco haber conseguido estar en el centro de Barcelona en la misma semana del Mobile World Congress. Isabel es un encanto de anfitrión.",
            "rate": 5
          },
          {
            "at": "2016-03-24T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fafa6",
              "fullname": "Isabelle",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "26247027"
            },
            "txt": "The host canceled this reservation 2 days before arrival. This is an automated posting.",
            "rate": 4
          },
          {
            "at": "2016-04-07T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbaf2",
              "fullname": "Hélène",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "46103953"
            },
            "txt": "Chambre très bien située et hôtesse très sympathique. Merci encore Isabel pour l'accueil !",
            "rate": 5
          },
          {
            "at": "2016-04-13T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbdc3",
              "fullname": "Daniel",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "25801559"
            },
            "txt": "Sheets weren't clean... Shower has very low water pressure. Room is only good for sleeping. It's in a good location but that's about it. Isabel could've provided more information about what's around the house during check in... Overall just decent enough to sleep",
            "rate": 3
          },
          {
            "at": "2016-04-25T04:00:00.000Z",
            "by": {
              "_id": "622f3401e36c59e6164fabad",
              "fullname": "Maria Isabel",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "60712702"
            },
            "txt": "Isabel est accueillante. L'appartement est charmant, correspond aux images. Très bien situé, à côté de Palau de la musica, dans un vieil immeuble plein de charme un peu désuet. Amateurs de confort et décor \"tendance\" s'abstenir. Chez Isabel on se trouve dans une authentique ambiance d'artiste. Merci beaucoup, je garderai le souvenir de cet accueil lié aux souvenirs de Barcelone.",
            "rate": 5
          },
          {
            "at": "2016-05-04T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb967",
              "fullname": "Aitana",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "53206905"
            },
            "txt": "Es un piso con mucho encanto, muy tranquilo y en un lugar inmejorable. La anfitriona, Isabel, es amable y facilitadora. El piso es una construcción antigua, lo que le da un ambiente genial pero también hace que el agua de la ducha salga con poquísima presión y sea un poco incómodo a veces. A parte de esto, si tuviese que poner alguna queja sería la hora del chekout, ya que las diez de la mañana me parece un poco pronto. \r\nEn conjunto tuvimos una muy buena experiencia y repetiríamos sin duda.",
            "rate": 3
          },
          {
            "at": "2016-05-12T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbb88",
              "fullname": "Valentina",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "69740054"
            },
            "txt": "Isabel was a wonderful host even if she was not there. She was in touch with me by mobile constantly. Thank you so much!\r\nThe house it's nice and was very clean and quite in the night.Perfect location. All you need for few days in Barcelona!",
            "rate": 4
          },
          {
            "at": "2016-05-16T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb715",
              "fullname": "Jeremy",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "53581405"
            },
            "txt": "Isabel's place was perfect. It was cozy, clean and quiet. She was a very gracious host and was always there to answer my questions about getting around Barcelona. ",
            "rate": 3
          },
          {
            "at": "2016-05-25T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb0b2",
              "fullname": "Mei-Lin",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "40994614"
            },
            "txt": "Great room with lots of sunlight in a charming apartment. Fantastic location.",
            "rate": 4
          },
          {
            "at": "2016-06-10T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb1f7",
              "fullname": "Taneli",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "8010736"
            },
            "txt": "Isa was a kind and gracious host with a lovely appartment in a centric and vibrant area. We loved our stay and surely will visit again.",
            "rate": 4
          },
          {
            "at": "2016-06-16T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb623",
              "fullname": "Natasha",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "25592253"
            },
            "txt": "SUPER cute place with lots of charm!! Perfect for my first trip to Barcelona:) Amazing location! Gracias Isabel for helping me find last minute accommodations! \r\n",
            "rate": 5
          },
          {
            "at": "2016-06-23T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fc013",
              "fullname": "Elizabeth",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "78467282"
            },
            "txt": "Isabel was a great host. She met me at the local bar where she worked and took me to her home a street away. The flight of stairs up to here place was a bit daunting but I can see why she lives up there.. It was beautiful! The room and whole place was clean, tidy and very welcoming. I saw Isabel twice, when I arrived and when I left, but it was perfect. \n\nThe facilities were great. The pressure in the shower was weak but it didn't bother me one bit. It is a bit noisy being in the heart of the city, but I can imagine it would be anywhere in this area. It was lovely to have a balcony, and the location was very convenient. Thanks.x",
            "rate": 3
          },
          {
            "at": "2016-06-28T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb0af",
              "fullname": "Monika",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "11966400"
            },
            "txt": "Isabel was good host. Location is perfect.",
            "rate": 4
          },
          {
            "at": "2016-07-03T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb23a",
              "fullname": "Margaux",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "78589438"
            },
            "txt": "Super piso, super barrio! \r\nThe guest welcomed us well.",
            "rate": 3
          },
          {
            "at": "2016-07-11T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb21c",
              "fullname": "Elisabeth",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "4965921"
            },
            "txt": "It was really nice to stay at Isabels place. She is very uncomplicated and nice and the flat is super located for exploring bcn. For me it was perfect!:)",
            "rate": 5
          },
          {
            "at": "2016-07-23T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbd7f",
              "fullname": "Ingrid",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "6058273"
            },
            "txt": "IT was the perfect stay to Discover the city-a super location with sometimes noisy tourists (even we we're tourists but hopefully not so noisy) but that's part of the location i guess :-). We loved the colourful house and we Will Be go back for a next stay. thank you!",
            "rate": 3
          },
          {
            "at": "2016-07-30T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb1ac",
              "fullname": "Liliane",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "27060110"
            },
            "txt": "Isa is a very lovely, sensitive, artistic and gorgeous person. She is respectful of one's privacy but always ready to give support when asked upon. Be it in spoken or written form I always got my answers from her within no times. She also proofed to be very flexible in terms of arrival and departure times which I appreciated a great deal. If you are a fan of jazz music (like I am), make sure to double check ahead of time about her current concert dates so as not to miss your hostess on stage like I did (grumble ;-)).\n\nThe room I occupied was the smaller one of two that Isabel rents out. So if her flat is fully rented out there can be a maximum of 4 guests plus your hostess in the flat, which can cause some bathroom jam, especially during the hot and humid summer times, when the need for a cool shower is inherent to everyone's desire. \nMy room was as depicted. If you plan on using it for double occupancy, I recommend taking Isa's larger room (unless the two of you are very much in love and want to cuddle up close ;-)). Also, if you need a table for writing, ask for the larger room as well, which comes along with one.\nThe flat itself is absolutely enchanting and furnished with love and an artistic eye to details. It's location is a dream for touristic explorations with anything within walking distance. \nTherefore, I can easily recommend both Isabel and her flat to anyone wishing to immerge himself into the local customs and get a good doze of what it is like \"to live like a true Barcelonian\".  \n\nQuerida Isa, muchas gracias por tu hospedalid génial! Volveré a ciencia cierta!\nSaludos y besos\nLiliana",
            "rate": 3
          },
          {
            "at": "2016-08-10T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb8e1",
              "fullname": "Murat",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "35246459"
            },
            "txt": "The apartment is very centrally located, in the heart of the gothic part of the city and a couple of blocks from the Placa de Catalunya which makes transportation and sightseeing very easy. It's a 20 minute walk from the beach which is a plus. It's located in a very old building on the top floor, so it is rather stuffy and warm in the apartment. The room overlooks a very narrow street/alley so it's rather dark and it's easy to hear the noise coming from the street and the neighboring apartments. There are a few other rooms in the house that are being rented out, so other people will be staying in the house which makes it a necessity to lock the room when you leave the apartment. \n\nIt's important to note that this place has a very strict check out time. On our last day, we had an evening flight but had to check out in the morning. When we asked if we could check out late, Isa told us to take our stuff to the train station and use the lockers there, but the train station does not have lockers. We ended up renting a locker  at a place called \"Barcelona lockers\". That, I would say changed all the plans for the last day. \n\n",
            "rate": 5
          },
          {
            "at": "2016-08-26T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbcb4",
              "fullname": "Mina",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "121053"
            },
            "txt": "I was happy to experience Isabels home as described here. It was spacious, bright and original, with lovely colours and beautiful artwork surrounding me in every room. Isabel is a creative, sensitive and respectful person, with an open mind- yet she has the necessary boundaries that are required to organize an environment where so many different people are going to stay and hopefully enjoy. \nThe street itself is very lively, but the noises didn't bother me at all as i could easily block them out with earplugs. The location could not have been more sentral, still it's on \"the right side\" of the Rambla, where you can find more independent shops, restaurants, cafes and bars compared to the same leveled streets towards Raval. It is an old and very charming building, so if you want an minimalistic experience with cold, stainless steel and elevators this is not the place for you! And perhaps you are not the right person for this place either ;) I had to leave earlier due to illness, and was so sorry i couldn't stay throughout the whole month as planned. Hope to be seeing Isabel and her welcoming surroundings again one day ",
            "rate": 3
          },
          {
            "at": "2016-09-07T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb85f",
              "fullname": "Jessy",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "2935800"
            },
            "txt": "Isabel was an amazing host. She is incredible and super considerate. The apartment was by no means the best location in Barcelona, I walked everywhere and never needed a map or a taxi. Arriving late at night was always fine and there was never any disturbing street noise. The block is super cute with awesome little shops that are open during the day. Best neighborhood to be in and incredible city ! Muchísima gracias Isabel, estas invitada a visitar Los Ángeles, todo fue increíble !❤️",
            "rate": 3
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Off-the-grid"
        ],
        "equipment": {
          "bedsNum": 3,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-04-01",
            "end": "2025-04-03"
          },
          {
            "start": "2025-02-01",
            "end": "2025-02-03"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaafe",
        "name": "Copacabana Charm",
        "type": "Beach",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg"
        ],
        "price": "1,110",
        "summary": "Welcome! Upgrades Added as of January 2018 This listing is located in the Spanish Harlem Section of Manhattan. I offer a cozy apartment that has great transportation in and out the city! The area has a lot of ethnic restaurants and a lot of local, active residents. This residence is great for a quick, inexpensive stay in New York whether its for business, travel, or personal purposes. I am glad to welcome all guests!",
        "capacity": 3,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Free street parking",
          "Heating",
          "Smoke detector",
          "Carbon monoxide detector",
          "Essentials",
          "Shampoo",
          "Lock on bedroom door",
          "Hangers",
          "Iron",
          "Laptop friendly workspace",
          "translation missing: en.hosting_amenity_49",
          "translation missing: en.hosting_amenity_50",
          "Private living room",
          "Hot water",
          "Bed linens",
          "Extra pillows and blankets",
          "Refrigerator",
          "Dishes and silverware",
          "Cooking basics",
          "Oven",
          "Stove",
          "Host greets you"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "G95CU",
          "fullname": "User 7",
          "location": "New York, New York, United States",
          "responseTime": "within a few hours",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/61b62b90-e38b-4609-a3c4-ff5ff06b5c08.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/women/5.jpg",
          "isSuperhost": false,
          "id": "24800102",
          "description": "Welcome Everyone! Thank you for stopping by. \r\n\r\nI was born and raised in Manhattan and I am here to help  share the New York City Experience with others through Airbnb!  I am easy to connect with and very reachable and always willing to interact with people. \r\n\r\nI am big on cleanliness and hospitality. I strive on making Guests feel as comfortable as possible. \r\n\r\nI hope you would like to get a chance to visit my location and enjoy the hosting I provide. If you have any questions/ comments, feel free to contact me. \r\n"
        },
        "loc": {
          "country": "Brazil",
          "countryCode": "US",
          "city": "Rio de Janeiro",
          "address": "New York, NY, United States",
          "lat": -73.93955,
          "lan": 40.79733
        },
        "reviews": [
          {
            "at": "2016-03-26T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb8b4",
              "fullname": "Christine",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "47877926"
            },
            "txt": "Kevin was very welcoming and thorough with all information. The description of the property was accurate. It's also near the MTA if you want to get to another part of the city. Kevin got in touch before I arrived, and his brother was there to meet me and show me where everything was, which was great. Last but not least, he had provided a great information on the local area with recommendations for places to eat, etc., which I found really useful.\r\n",
            "rate": 4
          },
          {
            "at": "2016-04-17T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbdb9",
              "fullname": "Hector",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "36832696"
            },
            "txt": "Kevin was nice. And he was very responsive via text, which I appreciate. The listing is in East Harlem, which isn't for everyone. The area is not very posh, but, for me, it feels like home, so I tend to stay there whenever I go to New York. The listing description was accurate enough, with respect to the way the apartment looks. If you can't deal with noise at night, however, this might not be the place for you. The neighbors were surprisingly noisy in the wee hours of the night and virtually silent during the day. This apartment is close to the subway, which was very useful.",
            "rate": 4
          },
          {
            "at": "2016-04-23T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbdca",
              "fullname": "Jaime",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "37244180"
            },
            "txt": "Kevin was very helpful and communicative during the whole time. The apartment is very nice, and within walking distance to the subway. Would definitely stay there again.",
            "rate": 5
          },
          {
            "at": "2016-04-24T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fae69",
              "fullname": "Anan",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "30380132"
            },
            "txt": "I had a wonderful stay at Kevin's apartment. The apartment is very close to the six train line. Everything in the apartment was spotless clean. I definitely recommend this apartment to others. Thank you Kevin for hosting me!",
            "rate": 5
          },
          {
            "at": "2016-05-04T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbf23",
              "fullname": "Yamilis",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "5684819"
            },
            "txt": "Kevin fue excelente anfitrión. Se mantuvo en contacto con nosotros y fue muy comprensivo aún cuando llegamos más tarde de la hora acordada para el check in porque nos perdimos en el subway. También fue muy comprensivo para acordar el check out de acuerdo a la hora que fue más conveniente para nosotros, aún cuando también se nos hizo tarde. Nos proveyó de un matress de aire para nuestra amiga que vino de M.A. y se quedó una noche con nosotros. El barrio nos pareció bien, no tuvimos ningún incidente. Muchos puertoriqueños y Dominicanos, así que nos sentimos como en casa. Todo fue muy cómodo y limpio. Los vecinos hicieron mucho ruido en las noches, pero no fue problema para nosotros. Una sugerencia sería poner un espejo de cuerpo completo en alguna parte del apartento. En resumen, el apartamento fue perfecto para nosotros, nos volveríamos a quedar y claro que lo recomendaría! Muchas Gracias Kevin por tu ayuda!",
            "rate": 3
          },
          {
            "at": "2016-05-08T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb6a4",
              "fullname": "Leonam",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "44604680"
            },
            "txt": "Kevin was really thoughtful about everything. He gave me all information needed while staying on his house. The house was very clean.",
            "rate": 4
          },
          {
            "at": "2016-05-11T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fc063",
              "fullname": "Amy",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "4923470"
            },
            "txt": "Kevin is a really nice host, flexible and very responsive. The apartment is a 4th-floor walk up, well-maintained and exactly as advertised in the listing. The apartment has all the basic things--it's especially nice to have a kitchen and comfy sofa. There's no TV and wifi, but you probably don't need it anyway since you are here to see New York city! It is just a short 5-min walk from the subway station, so very convenient. Street noise is not a problem although you can hear the neighbors at times (the kids next door can be noisy). East Harlem is a bustling Latino neighborhood with many local eateries and shops. The food selection is supposed to be great (too bad we didn't get to try any). There is a grocery store right outside the building. There're always locals hanging out in front but we were never bothered. All and all, a good choice if you are looking to stay in this part of the city.",
            "rate": 4
          },
          {
            "at": "2016-05-17T04:00:00.000Z",
            "by": {
              "_id": "622f3401e36c59e6164fab7d",
              "fullname": "Vlad",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "61270769"
            },
            "txt": "Kevin was an excellent host. Everything was absolutely as described. The apartment is lovely and very clean. There are numerous windows in every room and there is plenty of light! Would definitely stay again!",
            "rate": 4
          },
          {
            "at": "2016-05-19T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbe7b",
              "fullname": "Derick",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "63351088"
            },
            "txt": "Great experience, we enjoyed ourselves for the night we stayed, only issue really were the neighbors being loud all night made it hard to sleep.",
            "rate": 4
          },
          {
            "at": "2016-05-21T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbefb",
              "fullname": "Derek",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "794527"
            },
            "txt": "Kevin's place is exactly as other reviewers describe it:  nice and clean, spacious and very convenient as a base to explore and enjoy NYC. \r\n\r\nThe Neighborhood is definitely classic East Harlem.  Very real NYC vibe. Not a tourist area.  \r\n\r\nThe neighbors are noisy sometimes, so if you are a light sleeper, that could be a problem. But I didn't have any trouble. \r\n\r\nIt would have been nice to have wireless, but I didn't come to NYC to play online, so I didn't mind that too much.  \r\n\r\nKevin was a very nice, responsive host! ",
            "rate": 5
          },
          {
            "at": "2016-05-22T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb484",
              "fullname": "Shiann",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "26290842"
            },
            "txt": "Kevin made my friend and I feel really welcomed. The apartment was very clean!",
            "rate": 3
          },
          {
            "at": "2016-05-26T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb208",
              "fullname": "Stephanie",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "73751485"
            },
            "txt": "Me and my husband stayed in the apartment this was our first time using this site and Kevin made us feel like we are regulars. We stayed one night and it was wonderful. Kevin contacted us right away and was really good with getting us whatever we need to stay there. The area is the only bad thing but when we went in the apartment you really forget about the outside.",
            "rate": 3
          },
          {
            "at": "2016-05-29T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb52c",
              "fullname": "Virginie",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "8842288"
            },
            "txt": "Kevin is easy to get in touch with and waited for us to arrive Even if it was already late in the evening. He even asked if everything was fine during our stay.\nThe appartment is perfectly situated to visit Manhattan island. Just note the neighbours are noisy if it is important to you.",
            "rate": 5
          },
          {
            "at": "2016-06-06T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb803",
              "fullname": "Ada",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "65358522"
            },
            "txt": "Kevin was absolutely wonderful. He was very responsive and communicative and I could tell he takes great pride in being an exceptional host. His place was exactly as described, as shown in the pictures and also very clean. The neighborhood is great and the room is a great price for someone looking to stay in the city and explore. It's right next to the trains, neighborhood gems but also commonly known stores for anyone who isn't familiar with the area. ",
            "rate": 4
          },
          {
            "at": "2016-06-11T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbc21",
              "fullname": "Fernando",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "75294316"
            },
            "txt": "everything was correct , very good condition to this price",
            "rate": 5
          },
          {
            "at": "2016-06-14T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbdfe",
              "fullname": "Francesca",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "56355386"
            },
            "txt": "This is my first time using Airbnb. Kevin responded quickly to my inquiry about booking his apartment. Once booked he was very easy to reach via phone or text if I needed to. His one bedroom apartment was very clean and nicely furnished. It is central to a lot of restaurants and neighborhood shopping should you need something and a couple blocks from the subway and buses. Kevin was a great host. He was there to greet me, show me around the apartment and tell me a bit about the area. He also has maps and booklets about what to visit while in New York City. There is wifi in the apartment which is great. Kevin checked in with me just to make sure everything was ok during my trip. I had a wonderful stay at his apartment and would book it again! ",
            "rate": 5
          },
          {
            "at": "2016-06-20T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb4de",
              "fullname": "Alex",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "45975680"
            },
            "txt": "Kevin was a phenomenal host, he was very accommodating about arrival and check out times and provided me with a ton of useful information to navigate the area and make my stay as pleasant as possible. The apartment is two blocks from the subway and easy to navigate from. I would definitely recommend staying at Kevin's for all those considering a trip to New York.",
            "rate": 4
          },
          {
            "at": "2016-06-24T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbd08",
              "fullname": "Johanna",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "75777207"
            },
            "txt": "The apartment is as described. Kevin is very pleasant and was kind to helped me bring my belongings to the apartment. The apartment is cozy in a great location. I will definitely be using this apartment again",
            "rate": 4
          },
          {
            "at": "2016-07-03T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb7a6",
              "fullname": "Bandele",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "5357325"
            },
            "txt": "Kevin's a great guy, but if you're looking for a hotel-like experience, this is NOT it... This however, IS a genuine NYC experience. Noisy & inconsiderate neighbors, dirty streets, dangerous vibes... All in all your safe, and anyone you actually talk to will be cool... Kevin was also very considerate and did everything he could to add comfort to my stay, he even warned me of the noisy neighbors in advance... This place is good for people who already know NYC, and need an affordable, SHORT-TERM (like 1-2days), place to crash uptown...",
            "rate": 4
          },
          {
            "at": "2016-07-13T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb80a",
              "fullname": "Bryan",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "73430217"
            },
            "txt": "This place was cozy, comfortable and very clean. The AC was very helpful during the heat waves. Good shower and great WiFi connection as well.",
            "rate": 5
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Trending"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-04-07",
            "end": "2025-04-13"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaff",
        "name": "Copacabana Charm",
        "type": "Castles",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg"
        ],
        "price": "870",
        "summary": "If the dates you wish are not available, we have other options in the same location. You can find them on my profile. My goal is for you to have your days with the most comfort i can propose. I want you to taste all the feelings in Porto, as our food, as our best places, our best pointviews. I just love to help you enjoying this beautiful city :)",
        "capacity": 2,
        "amenities": [
          "TV",
          "Cable TV",
          "Internet",
          "Wifi",
          "Kitchen",
          "Free street parking",
          "Heating",
          "First aid kit",
          "Safety card",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "24-hour check-in",
          "Hangers",
          "Hair dryer",
          "translation missing: en.hosting_amenity_49",
          "translation missing: en.hosting_amenity_50",
          "Room-darkening shades",
          "Hot water",
          "Bed linens",
          "Extra pillows and blankets",
          "Microwave",
          "Refrigerator",
          "Dishes and silverware",
          "Cooking basics",
          "Stove",
          "Single level home",
          "Long term stays allowed",
          "Host greets you",
          "Handheld shower head"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "x143V",
          "fullname": "User 8",
          "location": "Porto, Porto District, Portugal",
          "responseTime": "within a day",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/f3e85f0c-e28d-4698-9da9-2f203aea1f3d.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/men/1.jpg",
          "isSuperhost": true,
          "id": "9320470",
          "description": "Welcome!\r\nThe apartments has all the things to provide you a perfect days in Porto. It is located in a very central area, inside a typical oporto building. \r\nI will give you lots of informations about Porto, my personal tips, and I'll always be available to help you with anything. All I want is for you to go home knowing Porto and inevitably loving the city! :)\r\n\r\n"
        },
        "loc": {
          "country": "Brazil",
          "countryCode": "PT",
          "city": "Rio de Janeiro",
          "address": "Porto, Porto, Portugal",
          "lat": -8.59275,
          "lan": 41.1462
        },
        "reviews": [
          {
            "at": "2016-02-06T05:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb449",
              "fullname": "Tejovra",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "41111599"
            },
            "txt": "Nuno and Francisca were extremely kind and helpful people. They made us feel very welcome and the house is surprisingly spacious. The wifi connection did struggle in our room but maybe we just had bad luck. They were even kind enough to extend our stay last minute. The service was top quality and the shower was amazing. Highly recommend staying here.",
            "rate": 4
          },
          {
            "at": "2016-02-21T05:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fafcc",
              "fullname": "Sara",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "52749020"
            },
            "txt": "Muito simpáticos e atenciosos. O apartamento é muito confortável e com pequenos detalhes que fazem a diferença. Muito perto do metro, o que é óptimo para deslocações necessárias.",
            "rate": 5
          },
          {
            "at": "2016-03-06T05:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164faf68",
              "fullname": "Jennifer",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "55700681"
            },
            "txt": "Bonjour, Notre séjour a été très agréable. Nous avons été très bien accueillies. Nuno nous a donné de nombreux conseils, lieux de visites... Le logement était également très bien. Nous avons vraiment pu profiter de Porto. Le métro est tout proche du logement. C'était vraiment un très bon séjour. Merci encore. ",
            "rate": 3
          },
          {
            "at": "2016-03-22T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb5b1",
              "fullname": "Irune",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "13478831"
            },
            "txt": "Our stay at Heroísmo IV was the perfect Airbnb experience. When we got there, Francisca was waiting for us. She was extremely nice and accommodating, she showed us the apartment and gave us a map of the city and plenty of tips about what to visit, where to eat, etc. The apartment is really small but has absolutely everything you need. It's clean, new, has a really nice kitchen, a very comfortable bed and is near the city center (we walked everyday). I highly recommend staying at Nuno's place. ¡Gracias por todo, Francisca! Porto is a beautiful city, we hope to come back soon!",
            "rate": 5
          },
          {
            "at": "2016-04-30T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb0c1",
              "fullname": "Marlene",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "61125497"
            },
            "txt": "A nice litte appartement. We arrived very late but were kindly greeted by the host. She showed us arround and gave us very useful tips (where to go/ where to eat/ etc.). The appartement is located directly to a metro station and has a Lidl and other grocery stores very near by.  It was a perfect stay!",
            "rate": 4
          },
          {
            "at": "2016-05-11T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fae67",
              "fullname": "Елизавета",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "20996941"
            },
            "txt": "Квартира не большая и очень уютная. В ней есть все необходимое. Отличное расположение рядом с метро. Я получила много полезной информации при заселении. Во время сильного дождя в ней сыро, но это не испортило отдых.",
            "rate": 4
          },
          {
            "at": "2016-08-05T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb3e7",
              "fullname": "Teresa",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "5868654"
            },
            "txt": "Desde o primeiro contacto, a comunicação foi muito fácil e clara. Colocaram à nossa disposição uma série de hipóteses de transporte a partir do aeroporto, bem como a possibilidade de termos em casa cabazes de alimentos. Assim que chegamos, com toda a sua simpatia, tinhamos a Mariana à nossa espera, recebeu-nos explicando os vários  pontos importantes para quem chega: locais a visitar, restaurantes, transportes...\r\nGostámos muito do espaço, do Porto, fazemos questão de voltar em breve. Local excelente!",
            "rate": 3
          },
          {
            "at": "2016-08-11T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbf5b",
              "fullname": "Joyce",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "39810791"
            },
            "txt": "Francisca was very friendly and was waiting for us, she took the time to explain us everything about the flat, she even let us good adresses of restaurants, coffees and places to visit in Porto.\r\nThe flat is 10 minutes by foot from the center, with no stairs to climb, good for our heavy luggages! It is very calm and we even had a table outside where we took our breakfasts. The flat is tiny but very functional, clean, and well equipped.\r\nIt is perfect for a short time in Porto.",
            "rate": 4
          },
          {
            "at": "2016-08-27T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbaad",
              "fullname": "Jess",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "35186577"
            },
            "txt": "The apartment is great value for money and the location is fantastic. We arrived before the check in time but were greeted promptly and could leave our luggage to explore the city straight away. Francisca gave us a lot of good advice and recommendations for the city, which was very helpful. ",
            "rate": 3
          },
          {
            "at": "2016-09-27T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164faeed",
              "fullname": "Jennifer",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "34970659"
            },
            "txt": "Thank you for hosting us Nuno. Our trip was perfect. The host was very kind. And the apartment is beautiful, near the center and is well think : it has everything for a few days.",
            "rate": 3
          },
          {
            "at": "2016-12-11T05:00:00.000Z",
            "by": {
              "_id": "622f3401e36c59e6164fab65",
              "fullname": "Joana",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "60496781"
            },
            "txt": "Estúdio muito simpático e limpo. Ideal para uma ou duas pessoas, para explorar o Porto durante um par de dias. Estação de metro à porta. Perto da zona histórica do Porto — faz-se bem a pé. Pastelaria ideal para pequeno almoço mesmo à porta.",
            "rate": 5
          },
          {
            "at": "2017-01-01T05:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb749",
              "fullname": "Nicolas",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "106998486"
            },
            "txt": "L'emplacement est parfait, dans un quartier calme et à proximité immédiate du métro et du centre-ville. Seul bémol: l'absence d'eau chaude à la douche (un seul ballon d'eau chaude disponible pour plusieurs appartements), franchement regrettable en plein coeur de l'hiver. Ce qui du coup entraîne un rapport qualité-prix un peu cher",
            "rate": 5
          },
          {
            "at": "2017-03-17T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb10c",
              "fullname": "Marina",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "115887917"
            },
            "txt": "El apartamento esta genial, es pequeño pero tiene todo lo necesario, cama super grande y cómoda, el apartamento está en general como nuevo y se ve exactamente como las fotos, estaba todo suuuuper limpio y tienen un radiador que calienta el habitáculo en muy poco tiempo. Nos recibió Rita, y de maravilla, nos dio un montón de información sobre Porto en un momento y nos dejó un montón de mapas e info útil. la zona es tranquila y tiene un montos de aparcamiento seguro en la misma calle. Aun que no está en el mismo centro de la ciudad se llega a el en un paseo de poco más de 10 mins, además en la misma puerta hay una parada de metro. Ha sido una experiencia genial quedarnos aquí para visitar la ciudad. Muchas gracias por la amabilidad, si volvemos a la ciudad no dudaríamos en volver a quedarnos aquí.",
            "rate": 3
          },
          {
            "at": "2017-04-13T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fad5b",
              "fullname": "Diogo",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "122269906"
            },
            "txt": "Gostamos muito do espaco, pequeno mas muito agradavel. Excelente para passar apenas uns dias. Obrigada ao Nuno que esperou por nos ate tarde e que ainda tirou um tempinho para nos explicar e dar umas dicas sobre a cidade! Aconselho!",
            "rate": 4
          },
          {
            "at": "2017-06-02T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb79e",
              "fullname": "Anastasia",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "9456078"
            },
            "txt": "Небольшая, но очень уютная квартирка со всем необходимым! Завтракать на свежем воздухе очень приятно, в кухне можно приготовить все, что захочешь! Очень гостеприимная хозяйка, рассказала много интересного о местах поблизости и в городе!",
            "rate": 4
          },
          {
            "at": "2017-06-18T04:00:00.000Z",
            "by": {
              "_id": "622f3401e36c59e6164fab70",
              "fullname": "Raphael",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "32418543"
            },
            "txt": "Excelente Studio, muito bem localizado e com todas as comodidades necessárias para uma pequena estadia.",
            "rate": 3
          },
          {
            "at": "2017-06-30T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbc99",
              "fullname": "Judith",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "47537690"
            },
            "txt": "The flat is situated right next to a metro station. Also perfect, if you arrive by car - free parking just in front. 15 mins walk to downtown but lot of cheap cafes and restaurants full of locals around.\nThe check-in was perfect. We got lots of information, what to do/see/where to eat. Thanks for that. \nThe Apartement is very small but for a short city visit, big enough. If you stay for a week or so, I would recommend a larger Apartement.  ",
            "rate": 3
          },
          {
            "at": "2017-07-11T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb694",
              "fullname": "Marta",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "20010340"
            },
            "txt": "Fantástica estancia en Oporto. Apartamento pequeño pero suficiente para pasar unos días en  Oporto una pareja. Situado un poco a las afueras pero muy buena comunicación  con el centro (parada de metro y autobús enfrente del apartamento).\nAtención inmejorable del anfitrión, respondiendo muy rápido a nuestras consultas y gestionando nuestra llegada. El único fallo es que la lavadora no se podía utilizar. Muy recomendable para pasar unos días en Oporto relación calidad-precio.\n",
            "rate": 5
          },
          {
            "at": "2017-07-30T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fadc4",
              "fullname": "Aron",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "31601157"
            },
            "txt": "We had a very nice welcome where we received tips about the neighbourhood. Those we tried turned out excellent. It's a 15 to 20 minute walk to the centre, the room is small but it has everything you need and is well maintained. Very close to the subway, a small outdoor area where you can sit. \nTip: sandwiches (pork with cheese) from casa guedes",
            "rate": 4
          },
          {
            "at": "2017-11-15T05:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fba79",
              "fullname": "Márcio",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "50134628"
            },
            "txt": "Excelente relação preço qualidade, muito boa comodidade e excelentes acessos. Muitas opções para as refeições por perto e metro à porta. Recomendo.",
            "rate": 4
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Treehouses"
        ],
        "equipment": {
          "bedsNum": 1,
          "bathNum": 1,
          "bedroomNum": 0
        },
        "reservedDates": [
          {
            "start": "2025-01-20",
            "end": "2025-01-27"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aab00",
        "name": "Eiffel Retreat",
        "type": "Campers",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg"
        ],
        "price": "3,458",
        "summary": "The neighbourhood is a quiet, family residential area, 20 minutes by bus from the historic center of Porto and 20 minutes from the beach (Matosinhos - where you may eat very GOOD fish!). You will love to stay in a very spacious, familiar and bright room, where you can enjoy a large and flowery garden, comfortable kitchen and laundry with washer and dryer machine. My space is good for couples, solo adventures, and business travelers!",
        "capacity": 2,
        "amenities": [
          "Wifi",
          "Kitchen",
          "Free parking on premises",
          "Pets live on this property",
          "Cat(s)",
          "Washer",
          "Dryer",
          "First aid kit",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "Lock on bedroom door",
          "Hangers",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "translation missing: en.hosting_amenity_49",
          "translation missing: en.hosting_amenity_50"
        ],
        "roomType": "Private room",
        "host": {
          "_id": "WlVTz",
          "fullname": "User 9",
          "location": "Senhora da Hora, Porto, Portugal",
          "responseTime": "a few days or more",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/87b9ccba-154a-4546-8cbe-8bdb25ddb36c.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/women/1.jpg",
          "isSuperhost": false,
          "id": "80558077",
          "description": ""
        },
        "loc": {
          "country": "France",
          "countryCode": "PT",
          "city": "Paris",
          "address": "Porto, Porto District, Portugal",
          "lat": -8.63082,
          "lan": 41.18075
        },
        "reviews": [
          {
            "at": "2016-08-11T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fad68",
              "fullname": "Celeste",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "38181630"
            },
            "txt": "We had a very nice stay in the house and felt at home. The room is big and light, we had a private bathroom, could use the kitchen and the nice garden. Patricia picked us up at the station of the metro, the bus is near. Patricia and Chris are very open and welcoming people, we talked about Portugal, Fado, Porto ... Also, they gave us several tips to see in Porto. When we are in Porto again we will come back!! We really recommand to stay here. Thanks Patricia and Casimiro!",
            "rate": 3
          },
          {
            "at": "2016-08-14T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fadf0",
              "fullname": "Martin",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "32511082"
            },
            "txt": "Patricia and Chris has been wonderful hosts. They help us very much with all questions we had. We enjoyed our stay very much.",
            "rate": 5
          },
          {
            "at": "2016-08-15T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164faedf",
              "fullname": "Sandra",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "66617047"
            },
            "txt": "Une chambre très spacieuse et une salle de bain privée : au top ! \r\nChristian et Patricia ont été très accueillants et nous nous sommes tout de suite sentis comme chez nous ! ",
            "rate": 5
          },
          {
            "at": "2016-08-20T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb3ed",
              "fullname": "Erika",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "78636529"
            },
            "txt": "Des hôtes très accueillant et à l'écoute de leurs invités! De supers adresses à conseiller. \r\nUne maison décorée avec goût et avec une sublime salle de bain privée.\r\nLe centre est très facile d'accès en bus car inaccessible en voiture. \r\nTrès facile de se garer dans la rue de nos hôtes.\r\nUn excellent rapport qualité prix!",
            "rate": 4
          },
          {
            "at": "2016-08-22T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb9bd",
              "fullname": "Guy",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "88496638"
            },
            "txt": "Patricia et Casimir ont été très accueillants et nous ont donné toutes les informations pratiques pour se rendre au centre de Porto en bus. La chambre est spacieuse et la salle de bain privée est juste à coté. Le quartier est très calme et le séjour était très agréable.",
            "rate": 3
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Tiny homes"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-04-05",
            "end": "2025-04-09"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aab01",
        "name": "Sugarloaf Suite",
        "type": "Islands",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg"
        ],
        "price": "2,990",
        "summary": "Welcome if you want to stay at a cozy flat with local experience.:) It is in the center of Istanbul.The neighborhood is safe and close to attractions.Transportation is easy. I will help you always.",
        "capacity": 2,
        "amenities": [
          "TV",
          "Cable TV",
          "Internet",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating",
          "Washer",
          "Essentials",
          "Shampoo"
        ],
        "roomType": "Private room",
        "host": {
          "_id": "gDVsb",
          "fullname": "User 10",
          "location": "Istanbul",
          "responseTime": "within an hour",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/user/6bf03261-e7ac-4e0e-8121-3828612bbb6a.jpg?aki_policy=profile_small",
          "pictureUrl": "https://randomuser.me/api/portraits/women/4.jpg",
          "isSuperhost": true,
          "id": "5823933",
          "description": "I live alone in Taksim area and i work at bar.\r\nI like meet new friends from all of the world.\r\nI like to Travel a lot ofcourse if i have free time :) East Asia , Sun , Sea , Sand , Movie  :) "
        },
        "loc": {
          "country": "Brazil",
          "countryCode": "TR",
          "city": "Rio de Janeiro",
          "address": "Taksim, Cihangir, Istanbul , Beyoğlu, Turkey",
          "lat": 28.98648,
          "lan": 41.03376
        },
        "reviews": [
          {
            "at": "2014-04-06T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbcc7",
              "fullname": "Quentin",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "12424603"
            },
            "txt": "I greatly appreciated both the location of the place (very central) and the appartment per se (clean and comfortable, with a very cosy room and with Wi-Fi). \r\n\r\nNihat was perfect host, quite welcoming and helpful about places to go (or avoid) and things to do in town. \r\n\r\nHosça kal!\r\n\r\n\r\n",
            "rate": 4
          },
          {
            "at": "2015-04-02T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb7f6",
              "fullname": "Steve",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "10300292"
            },
            "txt": "Nice room in a flat well located. Nihat is very nce and helpful. Good experience.",
            "rate": 3
          },
          {
            "at": "2015-05-19T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb624",
              "fullname": "Jess",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "8641944"
            },
            "txt": "We had a fantastic stay in this charming apartment. The location was perfect and Nihat welcomed us even when we made a late reservation and arrived early. He works at a bar no far from there- a great place to have a drink after seeing the sites! I highly recommend this place!",
            "rate": 3
          },
          {
            "at": "2015-08-25T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbcb6",
              "fullname": "Irina",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "42110174"
            },
            "txt": "The flat is clean and and very good located, 3 minutes walk to Taksim Square. The bedroom is quiet at night, even though there is a crowded area next to the flat. Nihat was always extremely quick in answering our emails and let us feel comfortable. He is really kind and discrete, we met him few times cause he works in the evening. ",
            "rate": 4
          },
          {
            "at": "2015-09-21T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fae1a",
              "fullname": "Matthew",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "40562632"
            },
            "txt": "Nihat went out of his way to accommodate our very early arrival and some unforeseeable challenges.  A great host!",
            "rate": 4
          },
          {
            "at": "2015-11-09T05:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fc03f",
              "fullname": "Valon",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "47981428"
            },
            "txt": "Nice place and host, very good location :)",
            "rate": 3
          },
          {
            "at": "2015-12-28T05:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb7a0",
              "fullname": "Amanda",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "29625938"
            },
            "txt": "Everything was great about the room and the location.",
            "rate": 4
          },
          {
            "at": "2016-01-09T05:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb3fe",
              "fullname": "Mathieu & Hilal",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "50390021"
            },
            "txt": "The stay at Nihat's place was really pleasant. The apartment is very clean and confortable, and located in a very vibrant and animated neighborhood with many restaurants, cafes, bars, shops just nearby. Just a 5 min walk to the Taksim Metro station makes it easy to access any other parts of the city pretty quickly. Nihat was also a great and welcoming host. We totally recommend this place for your stay in Istanbul, especially if you want to experience the local life to the fullest ! ",
            "rate": 5
          },
          {
            "at": "2016-03-20T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb225",
              "fullname": "Christie",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "48957037"
            },
            "txt": "The host canceled this reservation 30 days before arrival. This is an automated posting.",
            "rate": 5
          },
          {
            "at": "2017-05-11T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fad81",
              "fullname": "Vanessa",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "551888"
            },
            "txt": "I stayed at Nihat's for a week. It was exactly as the pics, very nice room. A little bit cold but he offers heating and AC. The apt is cozy and central, close to nice restaurants and bars. Have in mind is on the 4th fl no elevator. Nihat is a very easygoing guy who's open to help with any question or tip about the city. Totally recommend! thanks Nihat! ",
            "rate": 4
          },
          {
            "at": "2017-05-21T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb2d1",
              "fullname": "Florentin",
              "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg",
              "id": "75066050"
            },
            "txt": "Nihat is a very nice host, he is very helpful and creates an agreeable atmosphere inside the flat. Thank you :)",
            "rate": 5
          },
          {
            "at": "2017-08-27T04:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fae29",
              "fullname": "Harshak",
              "imgUrl": "https://randomuser.me/api/portraits/women/5.jpg",
              "id": "19784722"
            },
            "txt": "Nice cozy place very close to Taksim Square. Nihat is helpful and informative.",
            "rate": 3
          },
          {
            "at": "2017-09-26T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbc70",
              "fullname": "Haytham",
              "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg",
              "id": "10741329"
            },
            "txt": "nice apartment with good location. the room was clean and neat. Nihat was helpful and supportive. totally recommend his accommodation",
            "rate": 5
          },
          {
            "at": "2017-10-03T04:00:00.000Z",
            "by": {
              "_id": "622f3404e36c59e6164fb5fd",
              "fullname": "Vural",
              "imgUrl": "https://randomuser.me/api/portraits/women/1.jpg",
              "id": "14053758"
            },
            "txt": "Nihat is a very friendly host and makes you really feel comfortable. I have had a great stay and recommend it to anyone who wants to stay very central (Cihangir), the hip and modern part of the city with cozy venues and great cafes just a 3min walk. The place is very close to Taksim Square, etc...everything as described in the prior conments. I will definitely come again! Cheers vural",
            "rate": 3
          },
          {
            "at": "2017-12-03T05:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fba05",
              "fullname": "Wasseem",
              "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg",
              "id": "2072593"
            },
            "txt": "I totally recommend this place. Great experience staying at Nihat’s apartment. To start with, Nihat is a wonderful friendly person who I was happy to meet. He was very friendly at house, and we had the chance to spend time together outside. Staying with him reflects the true meaning of this website, which is living as a local with a local person. Thank you Nihat. \nRegarding the apartment, it is exactly as described. The room is nice and bed is comfortable. It was clean and well prepared for us. \nRegarding the neighborhood, it is very close to Taksim square and Istiklal Street with few minutes walk. As normal as it is in Istanbul, there is a short hill you need to walk to get to the square, which was totally fine with us. \n\nIn general, next time I visit Istanbul I would first check the availability with Nihat before searching others.",
            "rate": 5
          },
          {
            "at": "2018-02-23T05:00:00.000Z",
            "by": {
              "_id": "622f3402e36c59e6164fac4c",
              "fullname": "Mr Joseph",
              "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg",
              "id": "10668432"
            },
            "txt": "Nihat was an amazing host. He picked me up from the bus stop, gave me some great tips on what to do in Istanbul and just an all round great guy. If you're looking for somewhere close to Taksim then Nihat's place is great. Highly recommend him! Thanks Nihat.",
            "rate": 4
          },
          {
            "at": "2018-03-05T05:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb8b8",
              "fullname": "Gökçe",
              "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg",
              "id": "64172965"
            },
            "txt": "Nihat is so hospitable person. Me and My boyfriend stayed 6 days in Nihat's place and everything was perfect. Nihat is so tactful person despite he was working so hard, he all the time asked us 'do we need anything?' he was so clean and his house is exactly same with the pictures.\nI'm highly recommend his place! \nthank you Nihat!",
            "rate": 5
          },
          {
            "at": "2018-04-01T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb952",
              "fullname": "Bruno",
              "imgUrl": "https://randomuser.me/api/portraits/women/3.jpg",
              "id": "6316350"
            },
            "txt": "Very helping and welcoming host. Perfect location for a few days in Istanbul.",
            "rate": 3
          },
          {
            "at": "2018-04-04T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb73d",
              "fullname": "Vichapas",
              "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg",
              "id": "68234834"
            },
            "txt": "Nihat was very nice, polite and very helpful to us. He let us drop our baggages off in the morning and left them for a little longer when we checked out. The location is great as it is near Taksim Square. There are local grocery shops nearby if you want to buy some food or snacks.",
            "rate": 3
          },
          {
            "at": "2018-04-23T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fb0fe",
              "fullname": "Show",
              "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg",
              "id": "107816748"
            },
            "txt": "Nihat is very nice host, and came to wait for me in the shuttle bus station near Taksim squre, His house is very convenient for travel. He is very experirenced and warm host, the room super clean and warm, and house has everything, next time i will choose his house again in istanbul. miss you nihat. see you next time.",
            "rate": 5
          }
        ],
        "likedByUsers": [],
        "labels": [
          "Amazing pools"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-20",
            "end": "2025-02-22"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf10",
        "name": "Ipanema Escape",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437168/vbmfmdmwrxt7xfwbsw7c.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg"
        ],
        "price": "1,827",
        "summary": "Description for New Stay 1",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "S4dPn",
          "fullname": "User 1",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/5.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Brazil",
          "countryCode": "XX",
          "city": "Rio de Janeiro",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Amazing pools"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-20",
            "end": "2025-02-21"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf11",
        "name": "Table Mountain Retreat",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg"
        ],
        "price": "3,500",
        "summary": "Description for New Stay 2",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "pZFT4",
          "fullname": "User 2",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/5.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "South Africa",
          "countryCode": "XX",
          "city": "Cape Town",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Trending"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-01-06",
            "end": "2025-01-10"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf12",
        "name": "Pyramids View",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg"
        ],
        "price": "996",
        "summary": "Description for New Stay 3",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "cveg7",
          "fullname": "User 3",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/1.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Egypt",
          "countryCode": "XX",
          "city": "Cairo",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Bed & breakfasts"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-03-28",
            "end": "2025-03-31"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf13",
        "name": "Opera House Hideout",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg"
        ],
        "price": "2,090",
        "summary": "Description for New Stay 4",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "H3qQF",
          "fullname": "User 4",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/1.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Australia",
          "countryCode": "XX",
          "city": "Sydney",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Design"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-01-22",
            "end": "2025-01-25"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf14",
        "name": "Ipanema Escape",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg"
        ],
        "price": "3,105",
        "summary": "Description for New Stay 5",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "Wl0m8",
          "fullname": "User 5",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/2.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Brazil",
          "countryCode": "XX",
          "city": "Rio de Janeiro",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Trending"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-18",
            "end": "2025-02-25"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf15",
        "name": "Harbour Haven",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg"
        ],
        "price": "2,255",
        "summary": "Description for New Stay 6",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "hwTN9",
          "fullname": "User 6",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/2.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Australia",
          "countryCode": "XX",
          "city": "Sydney",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Beachfront"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-03-26",
            "end": "2025-03-31"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf16",
        "name": "Trevi Fountain Stay",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg"
        ],
        "price": "2,162",
        "summary": "Description for New Stay 7",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "G95CU",
          "fullname": "User 7",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/3.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Italy",
          "countryCode": "XX",
          "city": "Rome",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Top cities"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-01-08",
            "end": "2025-01-15"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf17",
        "name": "Opera House Hideout",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg"
        ],
        "price": "750",
        "summary": "Description for New Stay 8",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "x143V",
          "fullname": "User 8",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/3.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Australia",
          "countryCode": "XX",
          "city": "Sydney",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Beachfront"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-01-27",
            "end": "2025-02-03"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf18",
        "name": "Asakusa Escape",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg"
        ],
        "price": "5,014",
        "summary": "Description for New Stay 9",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "WlVTz",
          "fullname": "User 9",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/4.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Japan",
          "countryCode": "XX",
          "city": "Tokyo",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "OMG!"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-04-05",
            "end": "2025-04-11"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf19",
        "name": "Desert Oasis",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg"
        ],
        "price": "1,038",
        "summary": "Description for New Stay 10",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "gDVsb",
          "fullname": "User 10",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/4.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "UAE",
          "countryCode": "XX",
          "city": "Dubai",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Countryside"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-03-04",
            "end": "2025-03-09"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf20",
        "name": "Brooklyn Charm",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436852/y3scgbn8d6evumdpwdp4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437168/vbmfmdmwrxt7xfwbsw7c.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg"
        ],
        "price": "8,715",
        "summary": "Description for New Stay 11",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "S4dPn",
          "fullname": "User 1",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/5.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "USA",
          "countryCode": "XX",
          "city": "New York",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Islands"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-19",
            "end": "2025-02-23"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf21",
        "name": "Grand Palace Escape",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg"
        ],
        "price": "4,072",
        "summary": "Description for New Stay 12",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "pZFT4",
          "fullname": "User 2",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/5.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Thailand",
          "countryCode": "XX",
          "city": "Bangkok",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Luxe"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-03-13",
            "end": "2025-03-15"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf22",
        "name": "Trevi Fountain Stay",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg"
        ],
        "price": "926",
        "summary": "Description for New Stay 13",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "cveg7",
          "fullname": "User 3",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/1.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Italy",
          "countryCode": "XX",
          "city": "Rome",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Trending"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-04-09",
            "end": "2025-04-14"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf23",
        "name": "Louvre Loft",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg"
        ],
        "price": "5,282",
        "summary": "Description for New Stay 14",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "H3qQF",
          "fullname": "User 4",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/1.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "France",
          "countryCode": "XX",
          "city": "Paris",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Luxe"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-01-30",
            "end": "2025-02-01"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf24",
        "name": "Sugarloaf Suite",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg"
        ],
        "price": "1,238",
        "summary": "Description for New Stay 15",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "Wl0m8",
          "fullname": "User 5",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/2.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Brazil",
          "countryCode": "XX",
          "city": "Rio de Janeiro",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "OMG!"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-17",
            "end": "2025-02-24"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf25",
        "name": "Eiffel Retreat",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg"
        ],
        "price": "1,398",
        "summary": "Description for New Stay 16",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "hwTN9",
          "fullname": "User 6",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/2.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "France",
          "countryCode": "XX",
          "city": "Paris",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Cabins"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-01-31",
            "end": "2025-02-04"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf26",
        "name": "Opera House Hideout",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg"
        ],
        "price": "394",
        "summary": "Description for New Stay 17",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "G95CU",
          "fullname": "User 7",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/3.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Australia",
          "countryCode": "XX",
          "city": "Sydney",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Beachfront"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-23",
            "end": "2025-02-27"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf27",
        "name": "Sugarloaf Suite",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436261/hwqt72njlhf9hkqou9ka.jpg"
        ],
        "price": "735",
        "summary": "Description for New Stay 18",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "x143V",
          "fullname": "User 8",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/3.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Brazil",
          "countryCode": "XX",
          "city": "Rio de Janeiro",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Islands"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-24",
            "end": "2025-02-26"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf28",
        "name": "Nile Serenity",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg"
        ],
        "price": "1,587",
        "summary": "Description for New Stay 19",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "WlVTz",
          "fullname": "User 9",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/4.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Egypt",
          "countryCode": "XX",
          "city": "Cairo",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Farms"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-03-27",
            "end": "2025-04-02"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf29",
        "name": "Times Square Suite",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg"
        ],
        "price": "1,195",
        "summary": "Description for New Stay 20",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "gDVsb",
          "fullname": "User 10",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/4.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "USA",
          "countryCode": "XX",
          "city": "New York",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Luxe"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-03-19",
            "end": "2025-03-21"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf30",
        "name": "Opera House Hideout",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg"
        ],
        "price": "519",
        "summary": "Description for New Stay 21",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "S4dPn",
          "fullname": "User 1",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/5.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Australia",
          "countryCode": "XX",
          "city": "Sydney",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Trending"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-14",
            "end": "2025-02-16"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf31",
        "name": "Burj Khalifa View",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg"
        ],
        "price": "389",
        "summary": "Description for New Stay 22",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "pZFT4",
          "fullname": "User 2",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/5.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "UAE",
          "countryCode": "XX",
          "city": "Dubai",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Farms"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-03-29",
            "end": "2025-04-03"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf32",
        "name": "Colosseum Retreat",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg"
        ],
        "price": "626",
        "summary": "Description for New Stay 23",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "cveg7",
          "fullname": "User 3",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/1.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Italy",
          "countryCode": "XX",
          "city": "Rome",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Cabins"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-18",
            "end": "2025-02-24"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf33",
        "name": "Times Square Suite",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg"
        ],
        "price": "8,218",
        "summary": "Description for New Stay 24",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "H3qQF",
          "fullname": "User 4",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/1.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "USA",
          "countryCode": "XX",
          "city": "New York",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Mansions"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-04-06",
            "end": "2025-04-12"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf34",
        "name": "Safari Haven",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg"
        ],
        "price": "636",
        "summary": "Description for New Stay 25",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "Wl0m8",
          "fullname": "User 5",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/2.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "South Africa",
          "countryCode": "XX",
          "city": "Cape Town",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Amazing pools"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-02-18",
            "end": "2025-02-21"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf35",
        "name": "Asakusa Escape",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436329/cvylwkta0uannbxm3zns.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg"
        ],
        "price": "441",
        "summary": "Description for New Stay 26",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "hwTN9",
          "fullname": "User 6",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/2.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Japan",
          "countryCode": "XX",
          "city": "Tokyo",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Icons"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-01-11",
            "end": "2025-01-17"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf36",
        "name": "Grand Palace Escape",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg"
        ],
        "price": "1,298",
        "summary": "Description for New Stay 27",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "G95CU",
          "fullname": "User 7",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/3.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Thailand",
          "countryCode": "XX",
          "city": "Bangkok",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Off-the-grid"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-07-09",
            "end": "2025-07-13"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf37",
        "name": "Colosseum Retreat",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg"
        ],
        "price": "216",
        "summary": "Description for New Stay 28",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "x143V",
          "fullname": "User 8",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/3.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Italy",
          "countryCode": "XX",
          "city": "Rome",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Cabins"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-09-23",
            "end": "2025-09-26"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf38",
        "name": "Eiffel Retreat",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg"
        ],
        "price": "2,068",
        "summary": "Description for New Stay 29",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "WlVTz",
          "fullname": "User 9",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/men/4.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "France",
          "countryCode": "XX",
          "city": "Paris",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Desert"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-10-14",
            "end": "2025-10-20"
          }
        ]
      },
      {
        "_id": "622f337a75c7d36e498aaaf39",
        "name": "Sakura Stay",
        "type": "Hotel",
        "imgUrls": [
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436852/y3scgbn8d6evumdpwdp4.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg",
          "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg"
        ],
        "price": "303",
        "summary": "Description for New Stay 30",
        "capacity": 4,
        "amenities": [
          "TV",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating"
        ],
        "roomType": "Entire home/apt",
        "host": {
          "_id": "gDVsb",
          "fullname": "User 10",
          "location": "Somewhere, Earth",
          "responseTime": "within a day",
          "thumbnailUrl": "http://example.com/host.jpg",
          "pictureUrl": "https://randomuser.me/api/portraits/women/4.jpg",
          "isSuperhost": false
        },
        "loc": {
          "country": "Japan",
          "countryCode": "XX",
          "city": "Tokyo",
          "address": "123 Example Street",
          "lat": 0,
          "lan": 0
        },
        "reviews": [],
        "likedByUsers": [],
        "labels": [
          "Castles"
        ],
        "equipment": {
          "bedsNum": 2,
          "bathNum": 1,
          "bedroomNum": 1
        },
        "reservedDates": [
          {
            "start": "2025-08-31",
            "end": "2025-09-07"
          }
        ]
      }]
    saveToStorage(STORAGE_KEY, stays)
}