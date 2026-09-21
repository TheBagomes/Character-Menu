function HomeCharacter({ character }) {
  const { id, image, media } = character;
  const isVideo = media && /\.(webm|mp4)$/i.test(media);

  return (
    // key faz a animação de entrada rodar de novo a cada troca de campeão
    <div key={id} className="character-media">
      {isVideo ? (
        <video
          src={media}
          poster={image}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img src={media ?? image} alt="" />
      )}
    </div>
  );
}

export default HomeCharacter;