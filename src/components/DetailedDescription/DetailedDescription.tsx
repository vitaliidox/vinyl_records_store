/* eslint-disable max-len */
import './detailedDescription.scss';
import { Details } from '../../type/details';

type Props = {
  details: Details,
};

export const DetailedDescription: React.FC<Props> = ({ details }) => {
  const {
    id,
    genre,
    year,
    country,
    label,
    songs,
    format,
  } = details;

  let numberA = 0;
  let numberB = 0;

  const infoArray = [
    ["Format", format],
    ["Genre", genre],
    ["Release Date", year],
    ["Label", label],
    ["Country", country],
  ]

  return (
    <section className="detiled-description">
      <section
        data-cy="productDescription"
        className="detiled-description__about"
      >
        <h3 className="detiled-description__title-about">
          Product information:
        </h3>

      <table className="detiled-description__info-table">
        <tbody>
          {infoArray.map((item) => (
            <tr
              key={item[0] + id}
              className="detiled-description__info-items"
            >
              <th className="detiled-description__info-title">
                {item[0]}
              </th>
              <td className="detiled-description__info">
                {item[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>

      <section className="detiled-description__tracks-wrapper">
        <h3 className="detiled-description__title-tracks">
          Track list:
        </h3>

        <div className="detiled-description__songs-wrapper">
          <ul className="detiled-description__songs-list">
            {songs.map((song, index, array) => {
              return index < Math.ceil(array.length/2) ? (
                <li key={song.id} className="detiled-description__song">
                  {`A${++numberA}. ` + song.title}
                </li>
              ) : ('')})}
          </ul>

          <ul className="detiled-description__songs-list">
            {songs.map((song, index, array) => {
              return index >= Math.ceil(array.length/2) ? (
                <li key={song.id} className="detiled-description__song">
                  {`B${++numberB}. ` + song.title}
                </li>
              ) : ('')})}
          </ul>
        </div>
      </section>
    </section>
  );
};
