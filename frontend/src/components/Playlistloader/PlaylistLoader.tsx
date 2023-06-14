import ContentLoader from 'react-content-loader'

const PlaylistLoader = () => {
  return (
        <ContentLoader 
            speed={3}
            width={250}
            height={250}
            viewBox="0 0 250 250"
            backgroundColor="#202020"
            foregroundColor="#878787"
            >
            <rect x="52" y="25" rx="0" ry="0" width="124" height="107" /> 
            <rect x="55" y="151" rx="0" ry="0" width="93" height="8" /> 
            <rect x="55" y="172" rx="0" ry="0" width="84" height="9" />
        </ContentLoader>
    )
}

export default PlaylistLoader