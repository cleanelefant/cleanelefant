import window from "../images/services/windows.png";
import area from "../images/addons/area.webp";
import dish from "../images/addons/dish-washing.webp";
import hood from "../images/addons/extractor-hood.webp";
import microwave from "../images/addons/microwave.webp";
import refrigerator from "../images/addons/refrigerator.webp";
import baking from "../images/addons/baking.webp";
import carpet from "../images/addons/carpet.webp";
import armchair from "../images/addons/armchair.webp";
import stroller from "../images/addons/baby-stroller.webp";
import bed from "../images/addons/bed.webp";
import chair from "../images/addons/chair.webp";
import mattress from "../images/addons/mattress.webp";
import rug from "../images/addons/rug.webp";
import wooden_chair from "../images/addons/wooden-chair.webp";
import sofa from "../images/addons/sofa.webp";
import foursofa from "../images/addons/sofa4.webp";
import fivesofa from "../images/addons/sofa5.webp";
import kitchen from "../images/services/kitchen.png";
import balcony from "../images/addons/balcony.png";
import iron from "../images/addons/iron.png";

export const addons = [
  {
    id: 1,
    title: "Mycie okien po remoncie",
    price: 45,
    src: window,
    slug: "/test",
  },
  { id: 2, title: "Powierzchnia", price: 6, src: area, slug: "/test" },
  { id: 3, title: "Mycie piekarnika", price: 40, src: baking, slug: "/test" },
  { id: 4, title: "Mycie okapu", price: 40, src: hood, slug: "/test" },
  {
    id: 5,
    title: "Sprzątanie wnętrza szafek kuchennych",
    price: 55,
    src: kitchen,
    slug: "/test",
  },
  { id: 6, title: "Mycie naczyń", price: 25, src: dish, slug: "/test" },
  {
    id: 8,
    title: "Czyszczenie lodówki",
    price: 30,
    src: refrigerator,
    slug: "/test",
  },
  {
    id: 9,
    title: "Mycie mikrofalówki",
    price: 15,
    src: microwave,
    slug: "/test",
  },
  {
    id: 10,
    title: "Sprzątanie balkonu",
    price: 25,
    src: balcony,
    slug: "/test",
  },
  { id: 11, title: "Prasowanie", price: 45, src: iron, slug: "/test" },
  // { id: 12, title: "Sprzątanie kuwety", price: 10, src: window, slug: "/test" },
  { id: 13, title: "Dodatkowe godziny", price: 45, src: window, slug: "/test" },
  {
    id: 14,
    title: "Sprzątanie garderoby",
    price: 20,
    src: window,
    slug: "/test",
  },
  {
    id: 15,
    title: "Porządek i czyszczenie wnętrza szafy",
    price: 40,
    src: window,
    slug: "/test",
  },
  {
    id: 16,
    title: "Pranie kanapy dwuosobowej",
    price: 120,
    src: window,
    slug: "/test",
  },
  {
    id: 17,
    title: "Pranie kanapy trzyosobowej",
    price: 140,
    src: sofa,
    slug: "/test",
  },
  {
    id: 18,
    title: "Pranie narożnika (4 os)",
    price: 160,
    src: foursofa,
    slug: "/test",
  },
  {
    id: 19,
    title: "Pranie narożnika ( 5-6 os. )",
    price: 180,
    src: fivesofa,
    slug: "/test",
  },
  {
    id: 20,
    title: "Pranie narożnika (7+ os.)",
    price: 200,
    src: fivesofa,
    slug: "/test",
  },
  {
    id: 21,
    title: "Pranie jednoosobowego materaca",
    price: 60,
    src: window,
    slug: "/test",
  },
  {
    id: 22,
    title: "Prania jednoosobowego materaca z obu stron",
    price: 120,
    src: window,
    slug: "/test",
  },
  {
    id: 23,
    title: "Pranie dwuosobowego materaca",
    price: 120,
    src: mattress,
    slug: "/test",
  },
  {
    id: 24,
    title: "Pranie dwuosobowego materaca z obu stron ",
    price: 220,
    src: window,
    slug: "/test",
  },
  { id: 25, title: "Pranie dywanów", price: 7, src: carpet, slug: "/test" },
  { id: 26, title: "Pranie wykładziny", price: 6, src: rug, slug: "/test" },
  { id: 27, title: "Pranie fotela", price: 35, src: armchair, slug: "/test" },
  {
    id: 28,
    title: "Pranie krzeseł, taboretów",
    price: 15,
    src: wooden_chair,
    slug: "/test",
  },
  {
    id: 29,
    title: "Pranie fotela biurowego",
    price: 15,
    src: chair,
    slug: "/test",
  },
  {
    id: 30,
    title: "Pranie tapicerowanego zagłówka do łóżka ",
    price: 120,
    src: bed,
    slug: "/test",
  },
  {
    id: 31,
    title: "Pranie tapicerki wózka - spacerówki",
    price: 60,
    src: stroller,
    slug: "/test",
  },
];
