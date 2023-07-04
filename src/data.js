// const BASE_API_URL = "https://api.civil-engineering-tu.online";

const BASE_API_URL = "http://localhost:4000";

const subjectNames = {
    "first-year": {
        "first-season": [
            { subj: "ميكانيك هندسي 1", optionValue: "ميكانيك هندسي 1" },
            { subj: "تمثيل هندسي 1", optionValue: "تمثيل هندسي 1" },
            { subj: "رياضيات 1", optionValue: "رياضيات 1" },
            { subj: "فيزياء للمهندسين", optionValue: "فيزياء للمهندسين" },
            { subj: "أسس معلوماتية", optionValue: "أسس معلوماتية" },
            { subj: "عربي", optionValue: "عربي" },
            { subj: "انكليزي 1", optionValue: "انكليزي 1" },
        ],
        "second-season": [
            { subj: "ميكانيك هندسي 2", optionValue: "ميكانيك هندسي 2" },
            { subj: "تمثيل هندسي 2", optionValue: "تمثيل هندسي 2" },
            { subj: "رياضيات 2", optionValue: "رياضيات 1" },
            { subj: "كيمياء", optionValue: "كيمياء" },
            { subj: "برمجة", optionValue: "برمجة" },
            { subj: "ثقافة", optionValue: "ثقافة" },
            { subj: "انكليزي 2", optionValue: "انكليزي 2" },
        ],
    },
    "second-year": {
        "first-season": [
            { subj: "مقاومة 1", optionValue: "مقاومة 1" },
            { subj: "هيدروليك 1", optionValue: "هيدروليك 1" },
            { subj: "مساحة 1", optionValue: "مساحة 1" },
            { subj: "انشاء مباني 1", optionValue: "انشاء مباني 1" },
            { subj: "رياضيات 3", optionValue: "رياضيات 3" },
            { subj: "جيولوجيا هندسية", optionValue: "جيولوجيا هندسية" },
            { subj: "انكليزي 3", optionValue: "انكليزي 3" },
        ],
        "second-season": [
            { subj: "مقاومة 2", optionValue: "مقاومة 2" },
            { subj: "هيدروليك 2", optionValue: "هيدروليك 2" },
            { subj: "مساحة 2", optionValue: "مساحة 2" },
            { subj: "انشاء مباني 3", optionValue: "انشاء مباني 3" },
            { subj: "رياضيات 4", optionValue: "رياضيات 4" },
            { subj: "مواد بناء", optionValue: "مواد بناء" },
            { subj: "انكليزي 4", optionValue: "انكليزي 4" },
        ],
    },
    "third-year": {
        "first-season": [
            { subj: "ميكانيك الانشاءات 1", optionValue: "ميكانيك الانشاءات 1" },
            { subj: "بيتون مسلح 1", optionValue: "بيتون مسلح 1" },
            { subj: "تجهيزات فنية", optionValue: "تجهيزات فنية" },
            { subj: "هندسة الطرق", optionValue: "هندسة الطرق" },
            { subj: "تكنولوجيا مواد بناء", optionValue: "تكنولوجيا مواد بناء" },
            { subj: "تربة 1", optionValue: "تربة 1" },
            { subj: "هيدرولوجيا", optionValue: "هيدرولوجيا" },
        ],
        "second-season": [
            { subj: "ميكانيك الانشاءات 2", optionValue: "ميكانيك الانشاءات 2" },
            { subj: "بيتون مسلح 2", optionValue: "بيتون مسلح 2" },
            { subj: "ري و صرف", optionValue: "ري و صرف" },
            { subj: "نقل و مرور", optionValue: "نقل و مرور" },
            { subj: "مخلفات صلبة", optionValue: "مخلفات صلبة" },
            { subj: "ميكانيك تربة 2", optionValue: "ميكانيك تربة 2" },
            { subj: "جيوديزيا 1", optionValue: "جيوديزيا 1" },
        ],
    },
    "fourth-year": {
        "first-season": [
            { subj: "اساسات 1", optionValue: "اساسات 1" },
            { subj: "بيتون مسلح 3", optionValue: "بيتون مسلح 3" },
            { subj: "منشآت معدنية 1", optionValue: "منشآت معدنية 1" },
            { subj: "ميكانيك الانشاءات 3", optionValue: "ميكانيك الانشاءات 3" },
            { subj: "منشآت مائية", optionValue: "منشآت مائية" },
            { subj: "شبكات مياه شرب", optionValue: "شبكات مياه شرب" },
            { subj: "جيوديزيا 2", optionValue: "جيوديزيا 2" },
        ],
        "second-season": [
            { subj: "اساسات 2", optionValue: "اساسات 2" },
            { subj: "شبكات مياه صرف", optionValue: "شبكات مياه صرف" },
            { subj: "منشآت معدنية 2", optionValue: "منشآت معدنية 2" },
            { subj: "هندسة السدود", optionValue: "هندسة السدود" },
            { subj: "تكنولوجيا التشييد 1", optionValue: "تكنولوجيا التشييد 1" },
            { subj: "هندسة السكك الحديدية", optionValue: "هندسة السكك الحديدية" },
            { subj: "ديناميك الانشاءات", optionValue: "ديناميك الانشاءات" },
        ],
    },
    "fifth-year": {
        "first-season": [
            { subj: "تكنولوجيا التشييد 2", optionValue: "تكنولوجيا التشييد 2" },
            { subj: "المنشآت الخرسانية الخاصة", optionValue: "المنشآت الخرسانية الخاصة" },
            { subj: "المنشآت المختلطة", optionValue: "المنشآت المختلطة" },
            { subj: "تنقية مياه الشرب", optionValue: "تنقية مياه الشرب" },
            { subj: "تصميم بمعونة الحاسب", optionValue: "تصميم بمعونة الحاسب" },
            { subj: "هندسة المرافئ", optionValue: "هندسة المرافئ" },
        ],
        "second-season": [
            { subj: "الاقتصاد الهندسي", optionValue: "الاقتصاد الهندسي" },
            { subj: "هندسة الإنفاق والمنشآت المطمورة", optionValue: "هندسة الإنفاق والمنشآت المطمورة" },
            { subj: "معالجة مياه الصرف الصحي", optionValue: "معالجة مياه الصرف الصحي" },
            { subj: "هندسة المطارات", optionValue: "هندسة المطارات" },
            { subj: "ادارة المشاريع الهندسية", optionValue: "ادارة المشاريع الهندسية" },
        ],
    },
}

export default {
    BASE_API_URL,
    subjectNames,
};