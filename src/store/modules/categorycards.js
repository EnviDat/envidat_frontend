// import defaultImg from '@/assets/cards/default.png';
import snowImg from '@/assets/cards/c_b_snow_icy2_small.jpg';
import woodImg from '@/assets/cards/c_b_forest_topdown3_small.jpg';
import landImg from '@/assets/cards/c_b_landscape_view_small.jpg';
import hazardImg from '@/assets/cards/c_b_hazard_cloud_small.jpg';
import diversityImg from '@/assets/cards/b_c_diversity_meadow_small.jpg';
import dataCreatorImg from '@/assets/cards/data_creator_small.jpg';

export default [
  {
    title: 'Creator Login', type: 'login', img: dataCreatorImg,
  },
  {
    title: 'Forest', type: 'forest', img: woodImg,
  },
  {
    title: 'Snow', type: 'snow', img: snowImg,
  },
  {
    title: 'Landscape', type: 'landscape', img: landImg,
  },
  {
    title: 'Natural disasters', type: 'hazard', img: hazardImg,
  },
  {
    title: 'Diversity', type: 'diversity', img: diversityImg,
  },
];
