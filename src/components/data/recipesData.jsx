import Salad from "../../assets/recipes/Salad.jpg"
import QuinoaBurritoBowls from "../../assets/recipes/QuinoaBurritoBowls.jpg"
import Spaghetti from "../../assets/recipes/spaghetti.webp"

const recipesData = [
    {
      id: 1,
      name: 'Grilled Vegetable Salad',
      description:
        'A healthy and delicious grilled vegetable salad with a tangy vinaigrette.',
      ingredients: [
        'Zucchini',
        'Bell peppers',
        'Olive oil',
        'Lemon juice',
        'Garlic',
        'Parsley',
      ],
      instructions:
        'Grill the vegetables and toss them with olive oil, lemon juice, garlic, and parsley.',
      image: Salad
    },
    {
      id: 2,
      name: 'Quinoa and Black Bean Burrito Bowl',
      description:
        'A flavorful and filling bowl with quinoa, black beans, and fresh veggies.',
      ingredients: [
        'Quinoa',
        'Black beans',
        'Corn',
        'Avocado',
        'Lime',
        'Cilantro',
      ],
      instructions:
        'Cook quinoa and beans, then assemble with corn, avocado, and lime.',
      image: QuinoaBurritoBowls
    },
    {
      id: 3,
      name: 'Spaghetti Aglio e Olio',
      description:
        'A simple yet delicious pasta with garlic, olive oil, and red pepper flakes.',
      ingredients: [
        'Spaghetti',
        'Garlic',
        'Olive oil',
        'Red pepper flakes',
        'Parsley',
      ],
      instructions:
        'Cook spaghetti and toss with garlic, olive oil, and red pepper flakes.',
      image: Spaghetti
    },
  ];
  
  export default recipesData;