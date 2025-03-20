export interface ErrorResponse {
  error: {
    name: string;
    message: string;
  };
}
import { FetchError } from 'ofetch';
interface CharacterOCIDAPiResponse {
  ocid: string;
}
interface CharacterInfoAPiResponse {
  date: string | null;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: string;
  character_guild_name: string;
  character_image: string;
  character_date_create: string;
  access_flag: string;
  liberation_quest_clear_flag: string;
}

export const getCharacterOCIDAPi = async (
  search: string,
): Promise<CharacterOCIDAPiResponse> => {
  const config = useRuntimeConfig();
  const NXOPEN_API_KEY: string = config.public.nxopenApiKey;
  try {
    const response = await $fetch<CharacterOCIDAPiResponse>(
      'https://open.api.nexon.com/maplestory/v1/id',
      {
        method: 'GET',
        query: { character_name: search },
        headers: {
          'x-nxopen-api-key': NXOPEN_API_KEY,
        },
      },
    );
    return response;
  } catch (error) {
    if (error instanceof FetchError) {
      const errorT = error as FetchError<ErrorResponse>;
      throw new Error(errorT.response?._data?.error.message);
    }
    throw error;
  }
};

export const getCharacterDefaultInfoAPi = async (ocid: string) => {
  const config = useRuntimeConfig();
  const NXOPEN_API_KEY: string = config.public.nxopenApiKey;
  try {
    const response = await $fetch<CharacterInfoAPiResponse>(
      'https://open.api.nexon.com/maplestory/v1/character/basic',
      {
        method: 'GET',
        query: { ocid },
        headers: {
          'x-nxopen-api-key': NXOPEN_API_KEY,
        },
      },
    );
    return response;
  } catch (error) {
    if (error instanceof FetchError) {
      const errorT = error as FetchError<ErrorResponse>;
      throw new Error(errorT.response?._data?.error.message);
    }
    throw error;
  }
};
