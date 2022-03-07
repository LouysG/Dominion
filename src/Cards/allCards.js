import Artisan from './Artisan.js';
import Bandit from './Bandit.js';
import Bureaucrat from './Bureaucrat.js';
import Cellar from './Cellar.js';
import Chapel from './Chapel.js';
import Copper from './Copper.js';
import CouncilRoom from './CouncilRoom.js';
import Curse from './Curse.js';
import Duchy from './Duchy.js';
import Estate from './Estate.js';
import Festival from './Festival';
import Gardens from './Gardens.js';
import Gold from './Gold.js';
import Harbinger from './Harbinger.js';
import Laboratory from './Laboratory.js';
import Library from './Library.js';
import Market from './Market.js';
import Merchant from './Merchant.js';
import Militia from './Militia.js';
import Mine from './Mine.js';
import Moat from './Moat.js';
import Moneylender from './Moneylender.js';
import Poacher from './Poacher.js';
import Province from './Province.js';
import Remodel from './Remodel.js';
import Sentry from './Sentry.js';
import Silver from './Silver.js';
import Smithy from './Smithy.js';
import ThroneRoom from './ThroneRoom.js';
import Vassal from './Vassal.js';
import Village from './Village.js';
import Witch from './Witch.js';
import Workshop from './Workshop.js';

const allCards = [
    Artisan,
    Bandit,
    Bureaucrat,
    Cellar,
    Chapel,
    Copper,
    CouncilRoom,
    Curse,
    Duchy,
    Estate,
    Festival,
    Gardens,
    Gold,
    Harbinger,
    Laboratory,
    Library,
    Market,
    Merchant,
    Militia,
    Mine,
    Moat,
    Moneylender,
    Poacher,
    Province,
    Remodel,
    Sentry,
    Silver,
    Smithy,
    ThroneRoom,
    Vassal,
    Village,
    Witch,
    Workshop
];

const baseCards = [
    Copper,
    Silver,
    Gold,
    Estate,
    Duchy,
    Province,
    Curse,
]

const kingdomCards = [
    Artisan,
    Bandit,
    Bureaucrat,
    Cellar,
    Chapel,
    CouncilRoom,
    Festival,
    Gardens,
    Harbinger,
    Laboratory,
    Library,
    Market,
    Merchant,
    Militia,
    Mine,
    Moat,
    Moneylender,
    Poacher,
    Remodel,
    Sentry,
    Smithy,
    ThroneRoom,
    Vassal,
    Village,
    Witch,
    Workshop
]

const cards = [allCards, baseCards, kingdomCards];

export default cards;

export {
    Artisan,
    Bandit,
    Bureaucrat,
    Cellar,
    Chapel,
    Copper,
    CouncilRoom,
    Curse,
    Duchy,
    Estate,
    Festival,
    Gardens,
    Gold,
    Harbinger,
    Laboratory,
    Library,
    Market,
    Merchant,
    Militia,
    Mine,
    Moat,
    Moneylender,
    Poacher,
    Province,
    Remodel,
    Sentry,
    Silver,
    Smithy,
    ThroneRoom,
    Vassal,
    Village,
    Witch,
    Workshop
}