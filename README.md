# react-pokedex
Esta aplicación permite navegar y visualizar información detallada de los Pokémon usando la PokeAPI GraphQL v1beta. Los Pokémon se muestran en orden alfabético y al hacer clic en un Pokémon específico, se accede a una página de detalle que muestra información detallada del mismo. Además, es posible navegar entre las páginas de detalles de cada Pokémon.

Características
Listado de Pokémon: La aplicación muestra una lista de Pokémon en orden alfabético, con paginación incluida.
Detalles de Pokémon: Al hacer clic en un Pokémon, se accede a una página con información detallada de ese Pokémon, incluyendo estadísticas, habilidades, tipo, y más.
Navegación entre detalles: Se puede navegar entre las páginas de detalle de los diferentes Pokémon de manera continua.
Consumo de API GraphQL: La aplicación utiliza la PokeAPI a través de su endpoint GraphQL para obtener todos los datos.

Tecnologías utilizadas
React con TypeScript: Para la estructura de la aplicación y sus componentes.
Apollo Client: Para realizar las consultas a la PokeAPI usando GraphQL.
CSS: Para el diseño y la estilización.

Uso
La página principal muestra una lista de Pokémon en orden alfabético, con botones para navegar a través de diferentes páginas.
Haz clic en el nombre de cualquier Pokémon para acceder a la página de detalles, donde podrás ver la información específica del Pokémon, como su tipo, estadísticas y habilidades.
Dentro de la página de detalle, puedes usar los botones de navegación para moverte al siguiente o anterior Pokémon de la lista.

Próximas mejoras
Filtrado y búsqueda avanzada: Añadir un buscador que permita filtrar los Pokémon por tipos o habilidades.
Optimización de paginación: Mejorar el sistema de paginación para cargar más Pokémon de manera más eficiente.
Favoritos: Implementar una funcionalidad para que los usuarios puedan marcar a sus Pokémon favoritos.
