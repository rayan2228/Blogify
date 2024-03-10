import ModalWrapper from "./ModalWrapper";

import SearchWrapper from "../components/search/SearchWrapper";

const SearchModal = ({ onclose }) => {
  return (
    <ModalWrapper onClose={onclose}>
      <SearchWrapper onClose={onclose} />
    </ModalWrapper>
  );
};

export default SearchModal;
