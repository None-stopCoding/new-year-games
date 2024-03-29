import fallingAnimation from "./falling";
import runParticles from './particles';
import { default as _} from "lodash";
import sceneManager from "../../SceneManager";
sceneManager.register({ id: "gift", next: null });

let fall = fallingAnimation();
let myaudio = document.getElementById("myaudio");
let secondScene = document.getElementById("gift__second");
let letter = document.getElementById("letter");
let text = document.getElementById("text");
let textWrapper = document.getElementById("gift_letter");
let audio = new Audio("./audio/ho-ho-ho.mp3");
let envelop = document.getElementById("envelop");
audio.volume = 0.1;

export default function run() {
    fall.run();
    myaudio.volume = 0.05;
    myaudio.play();
    runParticles();

    setTimeout(function() {
        let wish = localStorage.getItem('wish');
        if (!wish) {
            wish = wishes[_.random(0, wishes.length - 1)];
            localStorage.setItem('wish', wish);
        }
        showWish(wish);
    }, 4000);

    function showWish(wish) {
        text.textContent = wish;
        textWrapper.classList.remove("re-hide");

        audio.play();
        setTimeout(function() {
            envelop.classList.remove("re-hide");
            envelop.classList.add("animated");
            envelop.classList.add("tada");
            setTimeout(function() {
                letter.style.transform = "translateY(0)";
                localStorage.setItem('currentScene', 'end');
            }, 1500);
        }, 1500);
    }
}

var wishes = [
    'Год будет для вас ослепительным.',
    'От ярких событий и красок иногда захочется закрыть глаза.',
    'Наслаждайтесь тем, что принесет новый год.',
    'Внимательно смотрите по сторонам, чтобы не упустить возможность обрести свое счастье.',
    'Год для вас будет благополучным. Все поводы волноваться останутся в прошлом.',
    'Семья и близкие будут радовать, коллеги по работе помогут в новом проекте.',
    'Денежных средств будет хватать и на отдых, и на инвестиции в свое будущее.',
    'Страсть откроется в работе, где захочется добиться намеченных ранее целей.',
    'Заведите блокнот, чтобы фиксировать все хорошее, что приготовил для вас будущий год.',
    'Год для вас будет наполнен сюрпризами. Все они будут приятными, поэтому опасаться их не стоит.',
    'Год будет для вас спокойным. Никуда не спешите, наслаждайтесь общением с близкими, встречами с друзьями.',
    'Счастье уже стоит за дверью.',
    'Прислушайтесь к советам интуиции.',
    'Люди, что сейчас рядом, будут помогать весь год.',
    'Нужная встреча произойдет совсем скоро.',
    'Удача в любом начинании.',
    'Год слёз, но только от радости.',
    'Карьерный рост будет стремителен и успешен.',
    'Фортуна ответит да на любой вопрос.',
    'Рискуйте и обязательно выиграете.',
    'Ничто не дастся в руки без упорной работы, но терпение и упорство приведут к положительным результатам.',
    'Год сулит чудеса и восторг со стороны окружающих. Готовьтесь стать центром компании и обрести новых друзей.',
    'Вам предстоит много работы, но и повышение дохода, как результат упорного труда.',
    'В этом году предстоит решить немало важных вопросов. Каждое принятое решение повлияет на дальнейшую жизнь. Будьте внимательны.',
    'Год благоприятен для самореализации. Все задуманное осуществится легко, как по волшебству. Поверьте в сказку и примите подарки судьбы.',
    'Год хорош для крупных приобретений. Новая машина не будет ломаться, а дом подарит тепло и уют.',
    'У такого солнышка всё может быть только хорошо!',
    'Покорив одну гору, начинай штурмовать другую.',
    'Терпение! Вы почти у цели',
    'Хорошо сделанное лучше, чем хорошо сказанное.',
    'Человек никогда не стар, чтобы учиться.',
    'Новые знания принесут Вам успех.',
    'Кто-то нуждается в вашей поддержке.',
    'Если хотите иметь успех, вы должны выглядеть так, как будто вы его имеете.',
    'Самое смешное желание - это нравиться всем.',
    'Победитель от побежденного отличается только тем, что поднимается на один раз больше, чем падает.',
    'Помни, что каждый день - первый в оставшейся части жизни.',
    'Обратная сторона кризиса - новые возможности.',
    'Дорога в тысячу миль начинается с первого шага.',
    'Никогда не бойся делать то, что ты не умеешь.',
    'Помни, ковчег был построен любителем. Профессионалы строили Титаник!',
    'Не поддавайтесь эмоциям.',
    'Раскройтесь и пропустите свет в ту часть своей жизни, которая до сих пор была тайной.',
    'Прекратите часто думать о богатстве, и оно непременно придет к вам.',
    'Меньше проявляйте свою гордость и будьте внимательны в поступках.',
    'Скоро ты избавишься от плохой привычки и приобретешь две новых.',
    'Цените то, что может исчезнуть.',
    'Вы будете бодры и энергичны, и потому весь год пройдет отлично!',
    'Неожиданно для всех ждет тебя БОЛЬШОЙ успех!',
    'Ждите рост семейного дохода и отпуск в любимое время года!',
    'Если будешь улыбаться, все мечты начнут сбываться.',
    'Будет Вам во всем удача! Баксы, джип, а также дача! Но болезней опасайтесь, чаще спортом занимайтесь!',
    'А для Вас такой прогноз: Вы держите выше нос! Если будут обижать - не забудьте сдачи дать!',
    'В общем, ты не пропадешь! В счастье, мире проживешь. Будет и любовь и ласка. Да, не жизнь, а просто сказка!',
    'Будет у тебя всегда, в доме вкусная еда.',
    'Исполнится заветная мечта, причиной тому будет доброта.',
    'Предсказание на новый год такое: Исполнитсятвоё желание любое!',
    'Согласно статистике, 80% проблем решаются сами собой, а остальные не решаются вообще. Так что забудь о проблемах и расслабься!',
    'Хочешь найти новый путь — прямо сейчас сойди со старой дороги.',
    'Твой кошелек не будет пуст, знать будет ежедневно денег хруст.',
    'Будет счастье у тебя, как и новые друзья.',
    'Приключения вас ждут, предсказания не врут.',
    'У вас появится больше времени для общения с семьей.',
    'Вы получите море вдохновения для осуществления всех ваших мечтаний.',
    'После новогодних каникул на вас нападут... невероятное везение, счастье и преуспевание. Сопротивление не поможет.',
    'Будет год весьма нелегким, ведь, как ни крути, – полный чемодан с деньгами тяжело нести.',
    'Новый год принесет шикарные подарки, а каждый день будет ярким!',
    'После новогодних праздников опасайтесь серьезного потрясения, вставая на весы.',
    'Любовь украсит ваши дни, и станут яркими они.',
    'А вас хозяйственных забот, домашних дел немало ждет.',
    'Ждут тебя большие посиделки в кругу друзей и семьи. А если круг будет маленький, значит сидеть в нем станет хорошо и приятно!',
    'Судьба позолотит вам ручку, пошлет солидную получку или подкинет кошелек. И это всё в ближайший срок!',
    'У Вас друзей, знакомых море, и все нагрянут в гости вскоре.',
    'Твои мечты обретут силу и объявят войну твоему дивану.',
    'Попрощайтесь с прошлым. Оно уже не будет иметь влияния на вас в наступающем новом году.',
    'Плохая новость — прибавишь в весе. Хорошая новость — прибавка произойдёт в области кошелька.',
    'Оптимизм тебе поможет, выше нос держать предложит.',
    'Вам полагается и впредь изобретательством гореть.',
    'Первый месяц года станет стартом вашего творческого подъема.',
    'Успех по службе потребует максимум терпения, выдержки и умения обходить «острые углы».',
    'Рассчитывай силы с умом: не успеет закончиться зима, как они тебе понадобятся.',
    'Печальный круг твой разорвется, ведь верный друг к тебе вернется!',
    'Дальняя поездка пойдет на пользу: вы будете находиться в знакомой ауре и приобретете крепкую дружбу.',
    'Вам суждено до сотни лет, дожить, не зная крупных бед!',
    'Идут к вам перемены в начале января, Вы их не отпугните, не суетитесь зря.',
    'Много всяких приключений вам удастся испытать, Но забвений, повреждений – не видать и не слыхать.',
    'Стремимся мы во времени: бежим, течем, парим, Вы ощутите скоро невиданный экстрим.',
    'Жизнь обретет стабильность, вы этого с нетерпением ждали.',
    'Как никогда именно в этом году у вас возникнет случай продемонстрировать свой природный дар, вместе с тем появятся новые планы, люди, приоритеты.',
    'Съездив в отпуск, вы будете смотреть на мир по-новому, и поэтому многие проблемы отпадут сами собой.',
    'Удача будет на вашей стороне!',
    'Оставьте все сомнения — время дерзких и решительных действий!',
    'Посвятите время семье и близким. Грядущий год будет ознаменован множеством тёплых уютных вечеров.',
    'Вы найдёте способ, как начать зарабатывать больше!',
    'Вас ждёт неожиданная прибыль.',
    'Прежде чем что-то радикально менять, остановитесь и задумайтесь: это точно то, что вы хотите?',
    'Год будет полон радостных событий: сбудется то, о чём вы давно мечтали!',
    'На праздничных новогодних каникулах случится что-то необыкновенное. Ждите и внимательно смотрите по сторонам!',
    'В новом году ваши самые смелые планы воплотятся в реальность, самые интересные идеи станут проектами, а самые сложные цели будут достигнуты.',
    'Самое время сделать то, что давно откладывали или боялись. Сейчас вам всё благоволит, и успешный исход предрешён.',
    'Никаких больше печалей! Вас будет радовать и удивлять каждый новый день',
];
