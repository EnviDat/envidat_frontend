// import defaultImg from '@/assets/cards/default.png';
import snowImg from '@/assets/cards/c_b_snow_icy2_small.jpg';
import woodImg from '@/assets/cards/c_b_forest_topdown3_small.jpg';
import landImg from '@/assets/cards/c_b_landscape_view_small.jpg';
import hazardImg from '@/assets/cards/c_b_hazard_cloud_small.jpg';
import diversityImg from '@/assets/cards/b_c_diversity_meadow_small.jpg';
import dataCreatorImg from '@/assets/cards/data_creator_small.jpg';

export default [
  {
    title: 'Creator Login', type: 'login', img: dataCreatorImg, color: '#e0f2f1',
  },
  {
    title: 'Forest', type: 'forest', img: woodImg,  color: '#e8f5e9',
  },
  {
    title: 'Snow', type: 'snow', img: snowImg, color: '#e0f7fa',
  },
  {
    title: 'Landscape', type: 'landscape', img: landImg, color: '#f1f8e9',
  },
  {
    title: 'Natural disasters', type: 'hazard', img: hazardImg, color: '#fbe9e7',
  },
  {
    title: 'Diversity', type: 'diversity', img: diversityImg, color: '#ede7f6',
  },
];
