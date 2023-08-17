import { Dna } from 'react-loader-spinner';
import { Loadoverlay } from './Loader.styled';

export const Loader = () => {
  return (
    <Loadoverlay>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </Loadoverlay>
  );
};
